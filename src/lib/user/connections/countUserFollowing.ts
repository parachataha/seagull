"use server"

import { query } from "../../database"

interface Result {
    success: boolean,
    msg: string,
    status: number,
    data?: number // the no. of following
}

export default async function countUserFollowing(id : number) : Promise<Result> {

    if (!id) return { success: false, msg: "Invalid id", status: 400 }

    try {

        const cols = [id]
        const count = await query(`
            SELECT COUNT(follower) 
            FROM followers 
            WHERE follower = $1`,
            cols
        )

        if (!count) throw "A database error occurred";

        const following : number = parseInt(count.rows[0].count)

        if (!following) return { success: true, msg: "No following", status: 200, data: 0 }
        return { success: true, msg: "Count found", status: 200, data: following } 

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