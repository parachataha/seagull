"use server"
import { cookies } from "next/headers";
import { cache } from "react";
import { validateSession } from "../sessions/validateSession";

// Types
import { SessionValidationResult } from "@/types/auth";

export const getCurrentSession = cache(async () : Promise<SessionValidationResult> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value ?? null;

    if (token === null) {
        return { session: null, user: null }
    }
    const result = await validateSession(token);
    return result;

})