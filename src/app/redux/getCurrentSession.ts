"use server"
import validate from "@/api/actions/sessions/validate";
import { cookies } from "next/headers";

// Types
import { Session } from "@/types/Session";
import { Result } from "@/types/Result";
import { User } from "@/generated/prisma";

interface getCurrentSessionResult extends Result {
    session: Session | null,
    user: Partial<User> | null
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

    const result = await validate(token)
    if (!result.success || !result.session || !result.user) {
        cookieStore.delete("session");
        return {
            success: false,
            msg: result.msg,
            status: 400,
            session: null,
            user: null
        };
    } 

    return {
        success: true,
        msg: "Authenticated",
        status: 200,
        session: result.session,
        user: result.user
    };

}