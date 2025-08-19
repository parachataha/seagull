"use server"

import prisma from "@/lib/db";
import hashPass from "@/lib/password/hashPass";
/**
 * @function signup() - Used to signup users and create session automatically
 * @param 
 */

import { ServerResponse } from "@/lib/types/ServerResponse";
import { emailSchema, nameSchema, passwordSchema, userAgentSchema } from "@/schemas/user";
import createSession from "./createSession";
import { SafeSessionWithToken, SafeUser } from "@/lib/types/User";
import { cookies } from "next/headers";

export interface SuccessDataType {
    user: Partial<SafeUser>,
    session: SafeSessionWithToken
}

export default async function signup( { name, email, password, userAgent } : { name: string, email: string, password: string, userAgent: string | null } ) : Promise<ServerResponse<SuccessDataType>> {
    
    /**
     * Validation
     */
    if (!nameSchema.safeParse(name.trim()).success) return { success: false, msg: "Invalid name", status: 400 }
    if (!emailSchema.safeParse(email.trim()).success) return { success: false, msg: "Invalid email", status: 400 }
    if (!passwordSchema.safeParse(password.trim()).success) return { success: false, msg: "Invalid password", status: 400 }
    if (userAgent && !userAgentSchema.safeParse(userAgent.trim()).success) return { success: false, msg: "Invalid user agent passed", status: 400 }

    const cookieStore = await cookies()

    if (cookieStore.get("session")?.value) return { success: false, msg: "You are already authenticated", status: 401 } 

    // Used to store createdAt value
    const now = new Date()

    try {

        /**
         * Hash password
         */

        const hashedPassword = await hashPass(password.trim())
        
        if (!hashedPassword) throw new Error("Internal error occurred preventing password hashing")

        /**
         * Store new user in database
         */

        const result = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: hashedPassword,
                createdAt: Math.floor(now.getTime() / 1000)
            }
        })

        if (!result) throw new Error("Database internal error")

        /**
         * Create cookie in database and client
         */
        const createSessionResult = await createSession( result.id, userAgent );

        if (!createSessionResult.success || !createSessionResult.data) return { success: false, msg: createSessionResult.msg, status: createSessionResult.status }

        // All successful

        return {
            success: true,
            msg: "User successfully created",
            status: 200,
            data: {
                user: {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    createdAt: result.createdAt,
                    slug: null,
                    about: null,
                    avatarId: 1,
                },
                session: {
                    id: createSessionResult.data.id,
                    token: createSessionResult.data.token,
                    createdAt: createSessionResult.data.createdAt,
                }
            }
        }
                
    } catch (error : string | any) {

        if (error.code === "P2002") return { 
            success: false, 
            msg: "A user already exists with that email",
            status: 409,
        }

        console.error(error)

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500, error: error }

    }

}