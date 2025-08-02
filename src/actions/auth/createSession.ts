/**
 * Creating a session requires a few steps & a prerequisite;
 * 1. @function generateSecureRandomString - Generate a random string 
 * 2. @function 
 */

import prisma from "@/lib/db";
import generateSecureRandomString from "@/lib/sessions/generateSecureString";
import hashSecret from "@/lib/sessions/hashSecret";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { SessionWithToken } from "@/lib/types/Session";
import { SafeSession, SafeUser } from "@/lib/types/User";
import { idSchema, userAgentSchema } from "@/schemas/user";
import { cookies } from "next/headers";

export type SuccessDataType = SafeSession

export default async function createSession( userId: number, userAgent: string | null ) : Promise<ServerResponse<SuccessDataType>> {

    if (!idSchema.safeParse(userId).success) return { success: false, msg: "Invalid user ID", status: 403 }
    if (userAgent && !userAgentSchema.safeParse(userAgent.trim()).success) return { success: false, msg: "Invalid user agent", status: 400 }

    try { 
        // Store current timestamp for createdAt variable
        const now = new Date()
    
        /**
         * Generate secure session strings
         */
        const id = generateSecureRandomString(); // Sent to client
        const secret = generateSecureRandomString(); // Sent to client
        const secretHash = await hashSecret(secret); // Only sent to database
     
        const token = id + "." + secret; // Sent to client
    
        /**
         * Store import variables in an object
         */
        const session : SessionWithToken = {
            id,
            secretHash,
            createdAt: now,
            token,
        }
    
        /**
         * Create session in database
         */
        const result = await prisma.session.create({
            data: {
                userId: userId,
                id: session.id,
                secretHash: session.secretHash,
                createdAt: Math.floor(session.createdAt.getTime() / 1000), // Stores in Unix timestamp in seconds
                expiresAt: Math.floor((session.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000) / 1000), // expires in 30 days
                userAgent: userAgent
            }
        })
    
        if (!result) throw new Error("Database internal error")
        
        /**
         * Create session on client
         */
        const cookieStore = await cookies()
        cookieStore.set("session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(result.expiresAt * 1000),
            path: "/"
        });

        return { 
            success: true, 
            msg: "Session created", 
            status: 200, 
            data: { 
                id: result.id,
                token: session.token,
                createdAt: session.createdAt
            } 
        }

    } catch (error) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred creating session", status: 500 }

    }
}