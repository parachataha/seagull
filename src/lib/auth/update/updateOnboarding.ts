"use server"

import { query } from "@/lib/database"
import { getCurrentSession } from "../cookies/getCurrentSession"

interface Result {
    success: boolean,
    msg: string, 
    status: number,
    data?: number | null // returns the new stage
}

export default async function updateOnboarding(stage : number | null, oldStage: number) : Promise<Result> {

    if (stage && (stage > 3 || stage < 0)) return { success: false, msg: "Invalid stage", status: 400 }

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    if (stage == oldStage) return { success: false, msg: "Please enter a different stage", status: 400 }
    if (stage == currentUser.user.onboarding) return { success: false, msg: "Please enter a different stage", status: 400 }

    try {

        const cols = [stage, currentUser.user.id]
        const result = await query(`
            UPDATE users
            SET onboarding = $1
            WHERE id = $2    
        `, cols)

        if (!result) throw "A database error occurred"

        if (result.rowCount === 0) return { success: false, msg: "User about information could not be updated", status: 500 }

        return { 
            success: true,
            msg: "User about information updated successfully",
            status: 200,
            data: stage
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred", 
            status: 505
        }

    }

}