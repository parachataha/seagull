"use server"

import { query } from "../../database";
import { getCurrentSession } from "../cookies/getCurrentSession"

interface Result {
    success: boolean, 
    msg: string,
    status: number
}

export default async function followUser(id : number) : Promise<Result> {

    if (!id) return { success: false, msg: "Invalid ID", status: 400 };

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    if (currentUser.user.id === id) return { success: false, msg: "Sorry, you cannot follow yourself", status: 400 }

    try {

        const cols = [id, currentUser.user.id, new Date()]
        const result = await query(`
            INSERT INTO followers (followed, follower, created_at)
            VALUES ($1, $2, $3)
            ON CONFLICT DO NOTHING
        `, cols)

        if (!result) throw "A database error occurred"

        console.log(result)

        if (result.rowCount === 0) return { success: false, msg: "Could not follow user", status: 400 }

        return { 
            success: true, 
            status: 200,
            msg: "User followed"
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}  