"use server"
import { query } from "@/lib/database";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

// types
import { Session } from "@/types/auth";

export async function createSession(token: string, userId: number) : Promise<Session | null> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    
    const session: Session = {
        id: sessionId,
        userId,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }

    const cols = [session.id, session.userId, session.createdAt, session.expiresAt]

    try {
        const result = await query("INSERT INTO user_sessions (id, user_id, created_at, expires_at) VALUES ($1, $2, $3, $4)", cols)
        console.log(result)

        if (!result){
            throw "Session not created"
        }
        if (!result.rowCount || result.rowCount !== 1) {
            throw "Session not created"
        }

        return session;

    } catch (error) {
        console.log(error)
        return null;
    }

}