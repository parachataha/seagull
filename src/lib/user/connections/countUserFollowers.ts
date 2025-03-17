"use server"

import { query } from "../../database"

interface Result {
    success: boolean,
    msg: string,
    status: number,
    data?: number // the no. of followers
}

export default async function countUserFollowers(id : number) : Promise<Result> {

    if (!id) return { success: false, msg: "Invalid id", status: 400 }

    try {

        const cols = [id]
        const count = await query(`
            SELECT COUNT(followed) 
            FROM followers 
            WHERE followed = $1`,
            cols
        )

        if (!count) throw "A database error occurred";

        const followers : number = parseInt(count.rows[0].count)

        if (!followers) return { success: true, msg: "No followers", status: 200, data: 0 }
        return { success: true, msg: "Count found", status: 200, data: followers } 

    } catch (error) {

        console.log(error)

        return { 
            success: false, 
            status: 500,
            msg: error ? 
                `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            data: 0
        }
    }

}