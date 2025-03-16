"use server"

import { query } from "../database"
import hash from "../passwords/hash"
import generateSessionToken from "./sessions/generateSessionToken"
import { createSession } from "./sessions/createSession"
import { setSessionTokenCookie } from "./cookies/setSessionTokenCookie"

// Types
import { Session, User } from "@/types/auth"

type Data = {
    firstName : string, 
    lastName : string, 
    email : string, 
    password : string
}

type Result = {
    success: true, 
    msg: string,
    status: number,
    user: User,
    session: Session | null,
} | { 
    success: false,
    msg: string,
    status: number
}

export default async function createUser(data : Data) : Promise<Result> {

    if (!data || (!data.firstName && !data.lastName && !data.email && !data.password)) { 
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

    const slug = `${data.email.trim().toLowerCase().split("@")[0]}${Math.floor(Math.random() * 10000)}`;

    try {

        const hashedPassword = await hash(data.password.trim());

        const cols = [slug, data.firstName, data.lastName, data.email, hashedPassword, new Date()]
        const result = await query("INSERT INTO users (slug, first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", cols)

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

        let session : Session | null = null
        
        if (createSessionResult) {
            session = createSessionResult;
            await setSessionTokenCookie(token, session.expiresAt);
        }

        return { 
            success: true, 
            status: 200,
            msg: "User created",
            user: {
                id: result.rows[0].id,
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim(),
                slug: slug.trim(),
                tags: [],
                avatar: 1,
                avatar_url: "/public/images/orange.svg",
                about: "",
                onboarding: 0,
                hireable: false,
                experience: [],
                followed: [],
                followers: [],
                followersCount: 0,
                followingCount: 0
            }, 
            session: session
        }

    } catch (error) {
        return { 
            success: false, 
            status: 400,
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred"
        };
    }

}