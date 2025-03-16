"use server"

import { query } from "@/lib/database"
import { getCurrentSession } from "../cookies/getCurrentSession"

interface Result {
    success: boolean,
    msg: string, 
    status: number,
    data?: string // returns the new about text
}

export default async function updateAbout(text : string | null, oldText: string | null) : Promise<Result> {

    if (!text || text.length > 500) return { success: false, msg: "Invalid text", status: 400 }

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    if (text == oldText) return { success: false, msg: "Please enter a different about text", status: 400 }
    if (text == currentUser.user.about) return { success: false, msg: "Please enter a different about text", status: 400 }

    try {

        const cols = [text, currentUser.user.id]
        const result = await query(`
            UPDATE users
            SET about = $1
            WHERE id = $2    
        `, cols)

        if (!result) throw "A database error occurred"

        if (result.rowCount === 0) return { success: false, msg: "User about information could not be updated", status: 500 }

        return { 
            success: true,
            msg: "User about information updated successfully",
            status: 200,
            data: text
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}