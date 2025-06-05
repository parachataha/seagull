// TYPES
import { Result } from "@/types/Result";
import { Session } from "@/types/Session";

// 
import prisma from "../db";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

interface ResultSession extends Result {
    session: Session
}

export default async function createSession(token: string, user_id: number) : Promise<ResultSession> {
    
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        user_id: user_id,
        expires_at: new Date(Date.now() + 1000 * 80 * 60 * 24 * 30),
        created_at: new Date(),
    }

    const newUser = await prisma.session.create({
        data: session
    })

    return {
        success: true,
        msg: "Session created",
        status: 200,
        session: session
    };

}
