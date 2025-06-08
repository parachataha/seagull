import { Result } from "@/types/Result";

// 
import { cookies } from "next/headers";
import prisma from "../db";

interface InvalidateSessionResult extends Result {
    // 
}

export async function invalidateSession(session_id : string) : Promise<InvalidateSessionResult> {

    try {

        await prisma.session.delete({ where: { id: session_id } });
        
        const cookieStore = await cookies()
        cookieStore.delete("session")

        return {
            success: true, 
            msg: "Signed out successfully",
            status: 200
        }

    } catch (error) {

        return {
            success: false, 
            msg: "Could not sign out",
            status: 500
        }

    }
}

export async function invalidateAllSession(userId: number) {
    await prisma.session.deleteMany({
        where: { userId: userId }
    })
}