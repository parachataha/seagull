"use server"

import { query } from "../database"
import { compareHash } from "../passwords/compareHash"

// Types
import { Session, User } from "@/types/auth"
import { createSession } from "./sessions/createSession"
import generateSessionToken from "./sessions/generateSessionToken"
import { setSessionTokenCookie } from "./cookies/setSessionTokenCookie"
import getUserTags from "../user/getUserTags"
import countUserFollowers from "../user/connections/countUserFollowers"
import countUserFollowing from "../user/connections/countUserFollowing"
import { UserTag } from "@/types/user_tag"
import getUser from "../user/getUser"

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
            SELECT 
                u.id, 
                u.slug, 
                u.first_name, 
                u.last_name, 
                u.email, 
                u.password, 
                u.created_at, 
                u.avatar, 
                i.id AS avatar_url,
                u.onboarding, 
                u.hireable,
                u.about
            FROM users u
            INNER JOIN images i
                ON i.id = u.avatar
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

        // CREATE SESSION
        const token = generateSessionToken()
        const id = rows.rows[0].id
        const createSessionResult : Session | null = await createSession(token, id)

        let session : Session | any = null
        if (createSessionResult) session = createSessionResult

        await setSessionTokenCookie(token, session.expiresAt)

        // FETCH USER DATA
        const userBasicData = rows.rows[0]
        const userData = await getUser(rows.rows[0].id, true);
        let user : User = { 
            id: userBasicData.id,
            slug: userBasicData.slug,
            firstName: userBasicData.first_name,
            lastName: userBasicData.last_name,
            email: userBasicData.email,
            tags: [],
            followersCount: 0,
            followingCount: 0,
            followers: [],
            followed: [],
            avatar: 1,
            avatar_url: "/images/public/orange.svg",
            onboarding: 0,
            hireable: false,
            about: "",
            experience: []
        }

        if (userData.success) { user = userData.user }
        else return { success: false, status: 500, msg: userData.msg }

        return { success: true, msg: "Logged in", 
            user: { ...user, email: rows.rows[0].email },
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