"use server";
import { query } from "../../database";

// Types
import { UserFollowed } from "@/types/user_followed";

interface Result {
    success: boolean;
    status: number;
    msg: string;
    data?: UserFollowed[]
}

export default async function getUserFollowed(id: number): Promise<Result> {

    if (!id) {
        return { success: false, msg: "Invalid user ID", status: 400, data: [] };
    }

    try {
        const rows = await query(`
            SELECT 
                f.id, 
                f.followed, 
                f.follower, 
                u.slug as followed_slug, 
                u.first_name as followed_first_name, 
                u.last_name as followed_last_name, 
                u.avatar as followed_avatar,
                i.url AS followed_avatar_url,
                f.created_at
            FROM followers f
            INNER JOIN users u
                ON f.followed = u.id
            INNER JOIN images i
                ON i.id = u.avatar
            WHERE f.follower = $1
            ORDER BY f.created_at
            LIMIT 30`,
            [id]
        );
        
        if (!rows) throw "A database error occurred";

        if (!rows.rows || rows.rows.length === 0) {
            return { success: true, status: 404, msg: "Followers not found", data: [] };
        }

        return {
            success: true,
            status: 200,
            msg: "Followers found",
            data: rows.rows.map((follower, index) => {
                return {
                    id: follower.id, 
                    follower: follower.follower,
                    followed_id: follower.followed,
                    followed_slug: follower.followed_slug,
                    followed_first_name: follower.followed_first_name,
                    followed_last_name: follower.followed_last_name,
                    followed_avatar: follower.followed_avatar,
                    followed_avatar_url: follower.followed_avatar_url,
                    created_at: follower.created_at ? new Date(follower.created_at).toISOString() : null
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
