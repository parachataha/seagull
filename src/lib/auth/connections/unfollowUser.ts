"use server"

import { query } from "../../database";
import { getCurrentSession } from "../cookies/getCurrentSession"

interface Result {
    success: boolean, 
    msg: string,
    status: number
}

export default async function unfollowUser(id : number) : Promise<Result> {

    if (!id) return { success: false, msg: "Invalid ID", status: 400 };

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    if (currentUser.user.id === id) return { success: false, msg: "Sorry, you cannot unfollow yourself", status: 400 }

    try {

        const cols = [currentUser.user.id, id]
        const result = await query(`
            DELETE FROM followers WHERE follower = $1 AND followed = $2
        `, cols)

        if (!result) throw "A database error occurred"

        console.log(result)

        if (result.rowCount === 0) return { success: false, msg: "Could not unfollow user", status: 400 }

        return { 
            success: true, 
            status: 200,
            msg: "User unfollowed"
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}  