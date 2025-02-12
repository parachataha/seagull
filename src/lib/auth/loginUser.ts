"use server"

import { query } from "../database"
import { compareHash } from "../passwords/compareHash"

// Types
import { Session } from "@/types/auth"
import { createSession } from "./sessions/createSession"
import generateSessionToken from "./sessions/generateSessionToken"
import { setSessionTokenCookie } from "./cookies/setSessionTokenCookie"

type Data = {
    email : string, 
    password : string
}

type Result = {
    success: boolean,
    status?: number,
    msg: string,
    user?: {
        id: number,
        firstName: string, 
        lastName: string, 
        email: string, 
        slug: string
    }, 
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
        console.log(correctPassword)

        if (!correctPassword) {
            return { success: false, status: 403, msg: "Password is incorrect" }
        }

        // Otherwise all correct, create a session

        const token = generateSessionToken()
        const id = rows.rows[0].id
        const createSessionResult : Session | null = await createSession(token, id)

        if (!createSessionResult) {
            return { success: true, msg: "Could not create session", 
                user: {
                    id: rows.rows[0].id,
                    slug: rows.rows[0].slug,
                    firstName: rows.rows[0].first_name,
                    lastName: rows.rows[0].last_name,
                    email: rows.rows[0].email
                },
                session: null
            }
        }

        // Session created

        await setSessionTokenCookie(token, createSessionResult.expiresAt)

        return { success: true, msg: "Logged in", 
            user: {
                id: rows.rows[0].id,
                slug: rows.rows[0].slug,
                firstName: rows.rows[0].first_name,
                lastName: rows.rows[0].last_name,
                email: rows.rows[0].email
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