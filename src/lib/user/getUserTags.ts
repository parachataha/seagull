"use server";

import { query } from "../database";

// Types
import { UserTag } from "@/types/user_tag";

interface Result {
    success: boolean;
    status: number;
    msg: string;
    data?: UserTag[];
}

export default async function getUserTags(id: number): Promise<Result> {
    if (!id) {
        return { success: false, msg: "Invalid user ID", status: 400, data: [] };
    }

    try {
        const rows = await query(
            `
            SELECT * 
            FROM user_tags 
            WHERE user_id = $1
            ORDER BY tag_order
            LIMIT 40
            `,
            [id]
        );

        if (!rows || !rows.rows || rows.rows.length === 0) {
            return { success: true, status: 404, msg: "User tags not found", data: [] };
        }

        return {
            success: true,
            status: 200,
            msg: "User tags found",
            data: rows.rows.map((tag) => ({
                id: tag.id,
                userId: tag.user_id,
                createdAt: tag.created_at instanceof Date ? tag.created_at.toISOString() : tag.created_at,
                type: tag.type,
                verified: tag.verified,
                value: tag.value,
                link: tag.link || null,
                tagOrder: tag.tag_order
            })),
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
