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
            user_sessions.id AS session_id, 
            user_sessions.user_id, 
            user_sessions.created_at AS session_created_at, 
            user_sessions.expires_at,
            users.slug  -- Fetch slug instead of full user data (getUser() will handle that)
        FROM user_sessions 
        INNER JOIN users ON users.id = user_sessions.user_id 
        WHERE user_sessions.id = $1`, 
        cols
    );

    if (!rows || rows.rowCount === 0) {
        return { session: null, user: null };
    }

    const userSessionData = rows.rows[0];

    // Fetch full user details via getUser()
    const userResult = await getUser(userSessionData.slug);
    if (!userResult.success || !userResult.user) {
        return { session: null, user: null };  // Fail-safe: Return null if user retrieval fails
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
