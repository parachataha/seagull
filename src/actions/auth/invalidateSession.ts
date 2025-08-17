"use server"
import prisma from "@/lib/db";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { tokenPartSchema, tokenSchema } from "@/schemas/session";
import { cookies } from "next/headers";

/**
 * Delete sessions from client and database
 * @param sessionId - Session id
 */
export default async function invalidateSession(sessionId?: string) : Promise<ServerResponse> {
    const result = await deleteServerSession(sessionId);
    deleteClientSession()
    return result;
}

/**
 * @function deleteClientSession() - Delete sessions on the client side
 */
export async function deleteClientSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session")
}

/**
 * Delete sessions from the database only
 * @param sessionId - Session id
 */
export async function deleteServerSession(sessionId?: string) : Promise<ServerResponse> {
    
    try {

        /**
         * When a session ID is given, delete the specific id
         * Else, we will find the cookie and delete the stored cookie and the corresponding value in the db
         */
        if (sessionId) {
            // WHEN ID GIVEN
            if (!tokenPartSchema.safeParse(sessionId).success) return { success: false, msg: "Invalid sessionId", status: 400 }
            
            await prisma.session.delete({
                where: {
                    id: sessionId
                }
            })
        } else {
            // WHEN NO ID IS GIVEN
            const cookieStore = await cookies()
            const token = cookieStore.get("session")?.value
            
            if (!tokenSchema.safeParse(token).success) {
                deleteClientSession();
                return { success: true, msg: "Invalid token", status: 400, data: undefined }
            }

            const sessionId = token?.split(".")[0];

            await prisma.session.delete({
                where: {
                    id: sessionId
                }
            })
        }

        return { success: true, msg: "Deleted session successfully", status: 200, data: undefined }

    } catch (error) {

        return { success: false, msg: "Internal server error occurred when deleting database session", status: 500 }
        
    }

}
