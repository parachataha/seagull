"use server"
/** 
 * Check if a user has a `session` cookie, and validate it to ensure if the user is not fraudulent
 */

// Zod schemas
import { tokenSchema } from "@/schemas/session";
import { userAgentSchema } from "@/schemas/user";

// Lib
import prisma from "@/lib/db";
import hashSecret from "@/lib/sessions/hashSecret";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { SafeUser } from "@/lib/types/User";

// Server actions
import invalidateSession, { deleteClientSession } from "./invalidateSession";

// Next.js and misc
import { cookies } from "next/headers";
import constantTimeEqual from "@/lib/sessions/constantTimeEqual";

export interface SuccessDataType {
    user: SafeUser;
} 

export default async function validateSession( userAgent: string | null ) : Promise<ServerResponse<SuccessDataType>> {

    try {

        /**
         * Validate userAgent if any
         */
        if (userAgent && !userAgentSchema.safeParse(userAgent).success) return { success: false, msg: "Invalid user agent", status: 400 }

        const cookieStore = await cookies()

        /**
         * Check if cookie exists
         */
        if (!cookieStore.get("session")) return { success: false, msg: "Not authenticated", status: 401 } // Using status 400 because we do not want to redirect the user to /login
        if (!cookieStore.get("session")?.value) return { success: false, msg: "Not authenticated", status: 401 } // Using status 400 because we do not want to redirect the user to /login

        /**
         * Check if the cookie is formatted correctly 
         */
        if (!tokenSchema.safeParse(cookieStore.get("session")?.value).success) { 
            deleteClientSession()
            return { success: false, msg: "Invalid token", status: 401 }
        }
        
        /**
         * Split the token into:
         * @const sessionId
         * @const sessionSecret
         */
        let tokenParts = cookieStore.get("session")?.value.split(".")

        /**
         * Ensure both sessionId and sessionSecret exist
         */
        if (tokenParts?.length !== 2) { 
            deleteClientSession()
            return { success: false, msg: "Invalid token", status: 401 } 
        }

        const sessionId = tokenParts[0] // Used to query DB
        const sessionSecret = tokenParts[1] // Hashed to compare against DB hashedSecret

        /**
         * Fetch the session from the database
         */
        const result = await prisma.session.findUnique({
            where: {
                id: sessionId
            },
            select: {
                userAgent: true,
                secretHash: true,
                expiresAt: true,
                user: {
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
                        Skills: {
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
                        avatar: {
                            select: {
                                url: true,
                                id: true,
                                size: true, 
                                createdAt: true,
                            }
                        }
                    }
                }
            }
        })
        
        if (!result) {
            deleteClientSession()
            return { success: false, msg: "Invalid session", status: 401 }
        }

        /** 
         * For added security, check if userAgent is the same to prevent session-stealing
         */
        if (userAgent !== result.userAgent) {
            deleteClientSession()
            return { success: false, msg: "Session devices do not match", status: 403 };
        }

        /**
         * Check if session is valid
         */
        const tokenSecretHash = await hashSecret(sessionSecret); // Hash client token's secret
        const validSecret = constantTimeEqual(tokenSecretHash, result.secretHash);
        if (!validSecret) {
            deleteClientSession()
            return { success: false, msg: "Invalid session", status: 403 };
        }

        /**
         * Check if session is expired or not.
         * If so: invalidate the session
         */
        const nowSeconds = Math.floor(Date.now() / 1000)
        if (nowSeconds > result.expiresAt) {
            // Delete session from db and client

            const result = await invalidateSession(sessionId); 
            if (!result.success) return { success: false, msg: result.msg, status: result.status }

            return { success: false, msg: "Session expired", status: 401 };
        }

        delete (result.user as any).password; // Remove password to return to client

        return {
            success: true, 
            msg: "Session validated",
            status: 200,
            data: {
                user: { 
                    ...result.user
                }
            }
        }

    } catch (error : any) {

        console.log(error)

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}

