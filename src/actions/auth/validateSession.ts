"use server"
/** 
 * Check if a user has a `session` cookie, and validate it to ensure if the user is not fraudulent
 */

import { ServerResponse } from "@/lib/types/ServerResponse";
import { SafeSessionWithToken, SafeUser } from "@/lib/types/User";
import { tokenSchema } from "@/schemas/session";
import { cookies } from "next/headers";
import { deleteClientSession } from "./invalidateSession";
import prisma from "@/lib/db";

export interface SuccessDataType {
    user: SafeUser;
} 

export default async function validateSession() : Promise<ServerResponse<SuccessDataType>> {

    try {

        const cookieStore = await cookies()

        /**
         * Check if cookie exists
         */
        if (!cookieStore.get("session")) return { success: false, msg: "Not authenticated", status: 400 } // Using status 400 because we do not want to redirect the user to /login
        if (!cookieStore.get("session")?.value) return { success: false, msg: "Not authenticated", status: 400 } // Using status 400 because we do not want to redirect the user to /login

        /**
         * Check if the cookie is formatted correctly 
         */
        if (!tokenSchema.safeParse(cookieStore.get("session")?.value).success) { 
            deleteClientSession()
            return { success: false, msg: "Invalid token", status: 400 }
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
            return { success: false, msg: "Invalid token", status: 400 } 
        }

        const sessionId = tokenParts[0]
        const sessionSecret = tokenParts[1]

        /**
         * Fetch the session from the database
         */
        const result = await prisma.session.findUnique({
            where: {
                id: sessionId
            },
            select: {
                user: true
            }
        })
        
        if (!result) throw new Error("Database internal error")

        // Remove password
        delete (result.user as any).password;

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

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}

