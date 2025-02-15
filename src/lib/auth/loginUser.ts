"use server"

import { query } from "../database"
import { compareHash } from "../passwords/compareHash"

// Types
import { Session, User } from "@/types/auth"
import { createSession } from "./sessions/createSession"
import generateSessionToken from "./sessions/generateSessionToken"
import { setSessionTokenCookie } from "./cookies/setSessionTokenCookie"
import getUserTags from "../user/getUserTags"

type Data = {
    email : string, 
    password : string
}

type Result = {
    success: boolean,
    status?: number,
    msg: string,
    user?: User,
    session?: Session | null
}

export default async function loginUser(data : Data) : Promise<Result> {

    if (!data || (!data.email.trim() && !data.password.trim())) {
        return { success: false, status: 400, msg: "Invalid data" }
    }
    if (!data.email.trim() || data.email.trim().toLowerCase().length > 255 || data.email.trim().toLowerCase().length < 4 || typeof data.password !== "string") {
        return { success: false, status: 400, msg: "Invalid email" }
    }
    if (!data.password.trim() || data.password.trim().toLowerCase().length > 100 || data.password.trim().toLowerCase().length < 6 || typeof data.password !== "string") {
        return { success: false, status: 400, msg: "Invalid password" }
    }
    
    try {

        const cols = [ data.email.trim().toLowerCase() ]
        const rows = await query(`
            SELECT id, slug, first_name, last_name, email, password, created_at 
            FROM users 
            WHERE email = $1`, 
            cols
        )

        if (!rows || !rows.rowCount) {
            return { success: false, status: 400, msg: "A user does not exist with that email" }
        }
        if (rows.rowCount < 1) {
            return { success: false, status: 404, msg: "A user does not exist with that email" }
        }
        if (rows.rowCount > 1) {
            return { success: false, status: 400, msg: "Multiple users found. Please contact support" }
        }
        
        const correctPassword : boolean = await compareHash(data.password.trim(), rows.rows[0].password)

        if (!correctPassword) {
            return { success: false, status: 403, msg: "Password is incorrect" }
        }

        // Get user tags
        const userBasicData = rows.rows[0]
        const userTagsData = await getUserTags(userBasicData.id)

        // Otherwise all correct, create a session

        const token = generateSessionToken()
        const id = userBasicData.id
        const createSessionResult : Session | null = await createSession(token, id)

        if (!createSessionResult) {
            return { success: true, msg: "Could not create session", 
                user: {
                    id: userBasicData.id,
                    slug: userBasicData.slug,
                    firstName: userBasicData.first_name,
                    lastName: userBasicData.last_name,
                    email: userBasicData.email,
                    tags: userTagsData.data
                },
                session: null
            }
        }

        // Session created

        await setSessionTokenCookie(token, createSessionResult.expiresAt)

        return { success: true, msg: "Logged in", 
            user: {
                id: userBasicData.id,
                slug: userBasicData.slug,
                firstName: userBasicData.first_name,
                lastName: userBasicData.last_name,
                email: userBasicData.email,
                tags: userTagsData.data
            },
            session: createSessionResult
        }

    } catch (error) {

        return { 
            success: false, 
            status: 400, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred"
        }
    }

}