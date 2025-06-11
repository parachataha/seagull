import { Result } from "@/types/Result";
import { Session } from "@/generated/prisma";

// 
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import prisma from "../db";
import { cookies } from "next/headers";
import { userAgent } from "next/server";

interface ValidateSessionResult extends Result
    { session: Session | null, user: any | null } 

export default async function validateSession(token : string) : Promise<ValidateSessionResult> {

    const cookieStore = await cookies()
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        }, 
        select: {
            id: true,
            createdAt: true,
            expiresAt: true,
            userId: true,
            userAgent: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    bio: true,
                    label: true,
                    createdAt: true,
                    tags: {
                        select: {
                            userId: true,
                            type: true,
                            value: true,
                            link: true
                        }
                    }
                }
            }
        }
    });

    if (result === null) {
        cookieStore.delete("session")
        return { 
            success: false, 
            msg: "Invalid session", 
            status: 403,
            session: null,
            user: null
        }
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
        cookieStore.delete("session")
        await prisma.session.delete({ where: { id: sessionId } });
        return { 
            success: false,
            msg: "Session expired",
            status: 403,
            session: null,
            user: null 
        }
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 30) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prisma.session.update({
            where: { id: session.id },
            data: { expiresAt: session.expiresAt }
        });
    }
    
    return { 
        success: true,
        msg: "Valid session",
        status: 200,
        session: session,
        user: user,
    }
}