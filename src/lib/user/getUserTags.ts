"use server"

import { query } from "../database"

// Types
import { UserTag } from "@/types/user_tag"

interface Result {
    success: boolean,
    status: number,
    msg: string,
    data?: UserTag[]
}

export default async function getUserTags(id : number) : Promise<Result> {

    if (!id) return { success: false, msg: "Invalid id passed", status: 400, data: [] };

    try {

        const cols = [id]
        const rows = await query(`
            SELECT * 
            FROM user_tags 
            WHERE user_id = $1
            LIMIT 20
        `, cols)

        if (!rows) throw "A database error occurred";

        if (!rows.rows) return { success: true, status: 404, msg: "User tags not found", data: [] };

        return { 
            success: true, status: 200, msg: "User tags found",
            data: rows.rows.map((tag) => {
                return {
                    id: tag.id,
                    userId: tag.user_id, 
                    createdAt: tag.created_at,
                    type: tag.type,
                    verified: tag.verified,
                    value: tag.value,
                    link: tag.link || null
                }
            })
        };

         
    } catch (error) {
        return { 
            success: false, 
            status: 500,
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            data: []
        }
    }

}