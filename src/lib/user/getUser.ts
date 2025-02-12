"use server"

import { User } from "@/types/auth"
import { query } from "../database"

type Result = {
    success: boolean,
    status: number,
    msg: string,
    user?: User
}

export default async function getUser(slug : string) : Promise<Result> {

    try {

        const cols = [slug]
        const rows = await query(`
            SELECT 
                id, 
                slug, 
                first_name, 
                last_name, 
                created_at
            FROM users
            WHERE slug = $1`,
            cols
        )

        if (!rows) {
            return { success: false, status: 400, msg: "Could not fetch user" }
        }
        if (!rows.rowCount) {
            return { success: false, status: 404, msg: "User does not exist" }
        }
        
        const data = rows.rows[0]

        return {
            success: true,
            msg: "User found",
            status: 200,
            user: {
                slug: data.slug,
                firstName: data.first_name,
                lastName: data.last_name,
                id: data.id,
                createdAt: data.created_at
            }
        }

    } catch (error) {
        return { 
            success: false, 
            status: 400, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
        }
    }

}