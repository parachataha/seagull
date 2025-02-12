"use server"
import { query } from "@/lib/database";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

// Types
import { Session, SessionValidationResult, User } from "@/types/auth";

export async function validateSession(token: string) : Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

    const cols = [sessionId]
    const result = await query(`
        SELECT 
            user_sessions.id AS session_id, 
            user_sessions.user_id, 
            user_sessions.created_at AS session_created_at, 
            user_sessions.expires_at,
            users.id, 
            users.slug, 
            users.first_name, 
            users.last_name, 
            users.email, 
            users.created_at 
        FROM user_sessions 
        INNER JOIN users ON users.id = user_sessions.user_id 
        WHERE user_sessions.id = $1`, 
        cols
    )
    
    if (!result || result.rowCount === 0) {
        return { session: null, user: null }
    }

    let session: Session = {
        id: result.rows[0].session_id,
        userId: result.rows[0].user_id,
        createdAt: result.rows[0].session_created_at,
        expiresAt: result.rows[0].expires_at
    }

    console.log(result)
    
    const user: User = {
        id: result.rows[0].id,
        slug: result.rows[0].slug,
        firstName: result.rows[0].first_name,
        lastName: result.rows[0].last_name,
        email: result.rows[0].email,
        createdAt: result.rows[0].created_at
    }

    const expiresAt = session.expiresAt instanceof Date
        ? session.expiresAt
        : new Date(session.expiresAt);

    if (Date.now() >= expiresAt.getTime()) {
        await query("DELETE FROM user_sessions WHERE id = $1", [ session.id ])
        return { session: null, user: null }
    }

    if (Date.now() >= expiresAt.getTime() - 1000 * 60 * 60 *24 * 30) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

        await query("UPDATE user_sessions SET expires_at = $1 WHERE id = $2", [session.expiresAt, session.id])

    }

    return { session, user };

}