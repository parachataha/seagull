"use server";
import { query } from "../../database";

// Types
import { UserFollower } from "@/types/user_follower";

interface Result {
    success: boolean;
    status: number;
    msg: string;
    data?: UserFollower[]
}

export default async function getUserFollowers(id: number): Promise<Result> {

    if (!id) {
        return { success: false, msg: "Invalid user ID", status: 400, data: [] };
    }

    try {
        const rows = await query(`
            SELECT 
                f.id, 
                f.followed, 
                f.follower, 
                u.slug as follower_slug, 
                u.first_name as follower_first_name, 
                u.last_name as follower_last_name, 
                u.avatar as follower_avatar,
                i.url AS follower_avatar_url,
                f.created_at
            FROM followers f
            INNER JOIN users u
                ON f.follower = u.id
            INNER JOIN images i
                ON i.id = u.avatar
            WHERE f.followed = $1
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
                    followed: follower.followed,
                    follower_id: follower.follower,
                    follower_slug: follower.follower_slug,
                    follower_first_name: follower.follower_first_name,
                    follower_last_name: follower.follower_last_name,
                    follower_avatar: follower.follower_avatar,
                    follower_avatar_url: follower.follower_avatar_url,
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
