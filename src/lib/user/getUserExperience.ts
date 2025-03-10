"use server";
import { query } from "../database";

// Types
import { Experience } from "@/types/experience";

interface Result {
    success: boolean;
    status: number;
    msg: string;
    data?: Experience[];
}

export default async function getUserExperience(id: number, currentUser: boolean): Promise<Result> {

    if (!id) {
        return { success: false, msg: "Invalid user ID", status: 400, data: [] };
    }

    try {

        const rows = await query(`
            SELECT
                e.id,
                i.experience_id,
                i.id AS item_id, 
                e.user_id, 
                e.title,
                e.description, 
                e.public, 
                e.type, 
                e.created_at,
                i.title AS item_title,
                i.description AS item_description,
                i.link AS item_link,
                i.attachments AS item_attachments,
                i.created_at AS item_created_at,
                i.date_start AS item_date_start,
                i.date_end AS item_date_end
            FROM experience_items i
            INNER JOIN experiences e
            ON i.experience_id = e.id
            WHERE user_id = $1
        `, [id])
        
        if (!rows) throw "A database error occurred";

        if (!rows.rows || rows.rows.length === 0) {
            return { success: true, status: 404, msg: "Experience not found", data: [] };
        }

        return {
            success: true,
            status: 200,
            msg: "Followers found",
            data: rows.rows.map((item, index) => {

                if (currentUser || item.public) 
                    return {
                        experience_id: item.experience_id, 
                        item_id: item.item_id,
                        user_id: item.user_id,
                        title: item.title,
                        description: item.description,
                        public: item.public,
                        type: item.type,
                        created_at: item.created_at ? new Date(item.created_at).toISOString() : null,

                        item_title: item.item_title,
                        item_description: item.item_description,
                        item_link: item.item_link,
                        item_attachments: item.item_attachments,
                        item_created_at: item.item_created_at ? new Date(item.item_created_at).toISOString() : null,
                        item_date_start: item.item_date_start,
                        item_date_end: item.item_date_end
                    }

            }),
        };

    } catch (error: any) {
        return {
            success: false,
            status: 500,
            msg: error instanceof Error ? error.message : "A server error occurred",
            data: [],
        };
    }
}
