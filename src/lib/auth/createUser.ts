"use server"

import { query } from "../database"
import hash from "../passwords/hash"
import generateSessionToken from "./sessions/generateSessionToken"
import { createSession } from "./sessions/createSession"
import { setSessionTokenCookie } from "./cookies/setSessionTokenCookie"

// Types
import { Session } from "@/types/auth"

type Data = {
    slug : string, 
    firstName : string, 
    lastName : string, 
    email : string, 
    password : string
}

type Result = {
    success: true,
    user: {
        id: number,
        firstName: string, 
        lastName: string, 
        email: string, 
        slug: string
    }, 
    session: Session | null
} | { 
    success: false,
    status: number, 
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

export default async function createUser(data : Data) : Promise<Result> {

    if (!data || (!data.firstName && !data.lastName && !data.email && !data.slug && !data.password)) { 
        return { success: false, status: 400, msg: "Invalid data" }
    }
    if (!data.firstName.trim() || data.firstName.trim().length > 60 || data.firstName.trim().length < 2) {
        return { success: false, status: 400, msg: "Invalid first name" }
    }
    if (!data.lastName.trim() || data.lastName.trim().length > 60 || data.lastName.trim().length < 2) {
        return { success: false, status: 400, msg: "Invalid last name" }
    }
    if (!data.email.trim() || data.email.trim().length > 255 || data.email.trim().length < 4 || !data.email.includes("@") || !data.email.includes(".")) {
        return { success: false, status: 400, msg: "Invalid email" }
    }
    if (!data.password.trim() || data.password.trim().length > 255 || data.password.trim().length < 8) {
        return { success: false, status: 400, msg: "Invalid password" }
    }
    if (!data.slug.trim() || data.slug.trim().length > 255 || data.slug.trim().length < 4) {
        return { success: false, status: 400, msg: "Invalid slug" }
    }

    try {

        const hashedPassword = await hash(data.password.trim());

        const cols = [data.slug, data.firstName, data.lastName, data.email, hashedPassword, new Date()]
        const result = await query("INSERT INTO users (slug, first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", cols)
        console.log("create user: ", result)

        if (!result) {
            return { success: false, status: 500, msg: "A database error occurred" }
        }
        if (result.rowCount === 0) {
            return { success: false, status: 500, msg: "User not created" }
        }
        if (result.rowCount !== 1) {
            return { success: false, status: 500, msg: "Invalid user creation" }
        }

        const token = generateSessionToken()
        const createSessionResult : Session | null = await createSession(token, result.rows[0].id);

        if (createSessionResult === null) {
            return { 
                success: false, 
                status: 400,
                msg: "error: User created but sessions could not be created",
                user: {
                    id: result.rows[0].id,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    email: data.email.trim(),
                    slug: data.slug.trim(),
                }, 
                session: null
            }
        }

        await setSessionTokenCookie(token, createSessionResult.expiresAt)

        return { 
            success: true, 
            user: {
                id: result.rows[0].id,
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim(),
                slug: data.slug.trim(),
            }, 
            session: createSessionResult
        }

    } catch (error) {
        return { 
            success: false, 
            status: 400,
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred"
        };
    }

}