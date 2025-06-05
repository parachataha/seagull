import { Result } from "@/types/Result";
import { Session } from "@/types/Session";

// 
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import prisma from "../db";

interface ValidateSessionResult extends Result
    { session: Session | null, user: any | null } 

export default async function validateSession(token : string) : Promise<ValidateSessionResult> {

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        }, 
        include: {
            user: true
        }
    });

    if (result === null) {
        return { 
            success: false, 
            msg: "Invalid session", 
            status: 403,
            session: null,
            user: null
        }
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expires_at.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return { 
            success: false,
            msg: "Session expired",
            status: 403,
            session: null,
            user: null 
        }
    }
    if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 30) {
        session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prisma.session.update({
            where: { id: session.id },
            data: { expires_at: session.expires_at }
        });
    }
    
    return { 
        success: true,
        msg: "Valid session",
        status: 200,
        session: session,
        user: user 
    }
}