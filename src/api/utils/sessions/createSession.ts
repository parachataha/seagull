"use server"
// TYPES
import { Result } from "@/types/Result";
import { Session } from "@/generated/prisma";

// 
import prisma from "../db";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { cookies } from "next/headers";

interface ResultSession extends Result {
    session?: Session,
}

export default async function createSession(token: string, userId: number, userAgent : string) : Promise<ResultSession> {
    
    try {

        // Store cookie on server
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
        const session: Session = {
            id: sessionId,
            userId: userId,
            userAgent: userAgent,
            expiresAt: new Date(Date.now() + 1000 * 80 * 60 * 24 * 30),
            createdAt: new Date(),
        }
    
        const newSession = await prisma.session.create({
            data: session
        })

        // Create client cooker
        const cookieStore = await cookies();
        cookieStore.set("session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            expires: newSession.expiresAt,
            path: "/"
        });

        return {
            success: true,
            msg: "Session created",
            status: 200,
            session: session
        };

    } catch (error) {

        return { 
            success: false,
            msg: "An error occurred creating session",
            status: 500
        }
        
    }

}
