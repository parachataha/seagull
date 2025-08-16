"use server"

/**
 * @function signup() - Used to signup users and create session automatically
 * @param 
*/

import prisma from "@/lib/db";

import { ServerResponse } from "@/lib/types/ServerResponse";
import { emailSchema, passwordSchema, userAgentSchema } from "@/schemas/user";
import createSession from "./createSession";
import { SafeSessionWithToken, SafeUser } from "@/lib/types/User";
import verifyPass from "@/lib/password/verifyPass";

export interface SuccessDataType {
    user: Partial<SafeUser>,
    session: SafeSessionWithToken
}

export default async function login( { email, password, userAgent } : { email: string, password: string, userAgent: string | null } ) : Promise<ServerResponse<SuccessDataType>> {
    
    /**
     * Validation
     */
    if (!emailSchema.safeParse(email.trim()).success) return { success: false, msg: "Invalid email", status: 400 }
    if (!passwordSchema.safeParse(password.trim()).success) return { success: false, msg: "Invalid password", status: 400 }
    if (userAgent && !userAgentSchema.safeParse(userAgent.trim()).success) return { success: false, msg: "Invalid user agent passed", status: 400 }

    // Used to store createdAt value
    const now = new Date()

    try {

        /**
         * Get basic user details (email and password)
         */ 
        const result = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase()
            },
            select: {
                password: true,
            }
        })

        // Return an ambiguous message to prevent attackers from identifying who has an account
        if (!result) return { success: false, msg: "Email or password is incorrect", status: 400 } 

        const passwordResult = await verifyPass(result.password, password.trim());
        if (!passwordResult.success) return { success: false, msg: passwordResult.msg, status: passwordResult.status };

        /**
         * Get all user details
         */
        const user = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase()
            },
            select: {
                id: true,
                name: true,
                email: true,
                about: true,
                label: true,
                avatarId: true,
                slug: true,
                createdAt: true,
                updatedAt: true,

                location: true,
                timezone: true,
                startWork: true,
                endWork: true,

                skills: {
                    select: {
                        userId: true,
                        id: true,
                        parentId: true,
                        name: true,
                        color: true,
                        order: true,
                        createdAt: true
                    }
                },

                timelines: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                
                avatar: {
                    select: {
                        url: true,
                        id: true,
                        size: true, 
                        createdAt: true,
                    }
                }
            }
        })

        if (!user) throw new Error("Database internal error")

        /**
         * Create cookie in database and client
         */
        const createSessionResult = await createSession( user.id, userAgent );

        if (!createSessionResult.success || !createSessionResult.data) return { success: false, msg: createSessionResult.msg, status: createSessionResult.status }

        // All successful

        return {
            success: true,
            msg: "User logged in",
            status: 200,
            data: {
                user: {
                    ...user
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

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}