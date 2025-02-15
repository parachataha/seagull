"use server"
import { query } from "@/lib/database";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

// Types
import { Session, SessionValidationResult, User } from "@/types/auth";
import getUserTags from "@/lib/user/getUserTags";

export async function validateSession(token: string) : Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

    const cols = [sessionId]
    const rows = await query(`
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
    
    if (!rows || rows.rowCount === 0) {
        return { session: null, user: null }
    }

    const userBasicData = rows.rows[0]
    const userTagsData = await getUserTags(userBasicData.user_id)

    let session: Session = {
        id: userBasicData.session_id,
        userId: userBasicData.user_id,
        createdAt: userBasicData.session_created_at,
        expiresAt: userBasicData.expires_at
    }

    const user: User = {
        id: userBasicData.id,
        slug: userBasicData.slug,
        firstName: userBasicData.first_name,
        lastName: userBasicData.last_name,
        email: userBasicData.email,
        createdAt: userBasicData.created_at,
        tags: userTagsData.data?.map((tag) => {
            return { 
                ... tag,
                createdAt: tag.createdAt instanceof Date 
                ? tag.createdAt.toISOString() : tag.createdAt
            }
        })
    }

    // HANDLE SESSION INFORMATION
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