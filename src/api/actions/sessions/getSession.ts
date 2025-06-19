"use server"
import prisma from "@/api/lib/db";

// Types
import { Result } from "@/types/Result";
import { Session } from "@/types/Session";
import { User } from "@/generated/prisma";
import { z } from "zod";

interface getSessionResult extends Result { 
    session?: Session,
    user?: Partial<User>
}

const sessionIdSchema = z.string().length(24).regex(/^[abcdefghijklmnpqrstuvwxyz23456789]+$/);


export default async function getSession(sessionId : string) : Promise<getSessionResult> {
  
    try {

        if (!sessionIdSchema.safeParse(sessionId).success) return { success: false, msg: "Invalid session id", status: 401 }

        const sessionResult = await prisma.session.findFirst({
            where: {
                id: sessionId.trim()
            },
            select: {
                secretHash: true,
                createdAt: true,
                id: true,
                user: true,
            }
        })

        if (!sessionResult) throw "An unexpected error occurred";

        // STORE SESSION STUFF
        const session : Session = {
            id: sessionResult.id,
            secretHash: sessionResult.secretHash,
            createdAt: sessionResult.createdAt
        }

        const user : Partial<User> = {
            ...sessionResult.user,
            password: ""
        }

        // CHECK EXPIRATION
        if (new Date().getTime() - session.createdAt.getTime() >= (60 * 60 * 24) * 1000) {
            // Session expired
            // TODO: Delete session
            return { success: false, msg: "Expired", status: 403 }
        }

        return { 
            success: true, 
            msg: "Session valid",
            status: 200,
            session: session,
            user: user
        }

    } catch (error) {

        return { success: false, msg: "An unexpected error occurred", status: 500 }

    }
    
} 