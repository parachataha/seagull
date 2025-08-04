import prisma from "@/lib/db";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { tokenPartSchema } from "@/schemas/session";
import { cookies } from "next/headers";

/**
 * Delete sessions from client and database
 * @param sessionId - Session id
 */
export default async function invalidateSession(sessionId : string) : Promise<ServerResponse> {
    deleteClientSession()
    const result = await deleteServerSession(sessionId);
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
export async function deleteServerSession(sessionId : string) : Promise<ServerResponse> {
    
    try {

        if (!tokenPartSchema.safeParse(sessionId).success) return { success: false, msg: "Invalid sessionId", status: 400 }

        await prisma.session.delete({
            where: {
                id: sessionId
            }
        })

        return { success: true, msg: "Deleted session successfully", status: 200 }

    } catch (error) {

        return { success: false, msg: "Internal server error occurred when deleting database session", status: 500 }
        
    }

}
