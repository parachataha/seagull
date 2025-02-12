"use server"

import DeleteSessionTokenCookie from "./cookies/DeleteSessionTokenCookie"
import { getCurrentSession } from "./cookies/getCurrentSession"
import { query } from "../database"

interface Result {
    success: boolean,
    msg: string,
    status: number
}

export default async function logoutUser() : Promise<Result> {

    const session = await getCurrentSession()

    if (!session) {
        return { success: false, msg: "No session found", status: 400 }
    }

    if (!session.session && !session.user) {
        return { success: false, msg: "Not authenticated", status: 403 }
    }

    try {

        const cols = [ session.session.id ];
        const result = await query(`DELETE FROM user_sessions WHERE id = $1`, cols);

        if (!result) {
            return { success: false, msg: "Could not delete session", status: 400 }
        }
        if (result.rowCount !== 1) {
            return { success: false, msg: "An error occurred when deleting session", status: 400 }
        }

        await DeleteSessionTokenCookie();

        return { success: true, msg: "Successfully logged out", status: 200 }

    } catch (error) {

        console.log(error)

        return { 
            success: false,
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 400
        }

    }

}