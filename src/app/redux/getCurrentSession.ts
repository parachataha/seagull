"use server"
import validateSession from "@/api/utils/sessions/validateSession";
import { Session, User } from "@/generated/prisma";
import { Result } from "@/types/Result";

// 
import { cookies } from "next/headers";

interface getCurrentSessionResult extends Result {
    session: Session | null,
    user: User | null
}

export default async function getCurrentSession() : Promise<getCurrentSessionResult> {

    const cookieStore = await cookies()

    const token = cookieStore.get("session")?.value ?? null;

    if (!token) { 
        return { 
            success: false,
            msg: "Not authenticated",
            status: 403,
            session: null,
            user: null 
        }
    }

    const result = await validateSession(token)
    if (result.success) {
        return {
            success: true,
            msg: "Authenticated",
            status: 200,
            session: result.session,
            user: result.user
        }
    } else {
        return {
            success: false,
            msg: result.msg,
            status: 400,
            session: null,
            user: null
        }
    }

}