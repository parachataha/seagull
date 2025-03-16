"use server"
import { query } from "@/lib/database";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

// Importing getUser function instead of duplicating logic
import getUser from "@/lib/user/getUser";

// Types
import { Session, SessionValidationResult } from "@/types/auth";

export async function validateSession(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const cols = [sessionId];
    const rows = await query(`
        SELECT 
            s.id AS session_id, 
            s.user_id, 
            s.created_at AS session_created_at, 
            s.expires_at,
            u.slug
        FROM user_sessions s
        INNER JOIN users u
            ON u.id = s.user_id 
        WHERE s.id = $1`, 
        cols
    );

    if (!rows || rows.rowCount === 0) {
        return { session: null, user: null };
    }

    const userSessionData = rows.rows[0];

    // Fetch full user details via getUser()
    const userResult = await getUser(userSessionData.slug, true);
    if (!userResult.success || !userResult.user) {
        return { session: null, user: null };
    }

    let session: Session = {
        id: userSessionData.session_id,
        userId: userSessionData.user_id,
        createdAt: new Date(userSessionData.session_created_at.toISOString()),
        expiresAt: new Date(userSessionData.expires_at.toISOString()),
    };

    // Check if session is expired
    const expiresAt = new Date(session.expiresAt);
    if (Date.now() >= expiresAt.getTime()) {
        await query("DELETE FROM user_sessions WHERE id = $1", [session.id]);
        return { session: null, user: null };
    }

    // HANDLE SESSIONS
    if (Date.now() >= expiresAt.getTime() - 1000 * 60 * 60 * 24 * 30) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await query("UPDATE user_sessions SET expires_at = $1 WHERE id = $2", [session.expiresAt, session.id]);
    }

    return { session, user: userResult.user };
}
