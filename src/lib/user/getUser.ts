"use server"

import { query } from "../database"
import getUserTags from "./getUserTags"
import countUserFollowers from "./countUserFollowers"
import countUserFollowing from "./countUserFollowing"

// Types
import { User } from "@/types/auth"
import { UserTag } from "@/types/user_tag"

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
        
        // Fetch Basic User Data
        const userBasicData = rows.rows[0]
        const userTagsData = await getUserTags(userBasicData.id)

        let tags : UserTag[] = []

        if (userTagsData.success && userTagsData.data) {
            tags = userTagsData.data;
        }

         // Fetch follower and following count
        const userFollowerCount = await countUserFollowers(userBasicData.id)
        const userFollowingCount = await countUserFollowing(userBasicData.id)

        let followersCount : number = 0
        let followingCount : number = 0

        if (userFollowerCount.success && userFollowerCount.data) { 
            followersCount = userFollowerCount.data
        }

        if (userFollowingCount.success && userFollowingCount.data) { 
            followingCount = userFollowingCount.data
        }

        return {
            success: true,
            msg: "User found",
            status: 200,
            user: {
                slug: userBasicData.slug,
                firstName: userBasicData.first_name,
                lastName: userBasicData.last_name,
                id: userBasicData.id,
                createdAt: userBasicData.created_at,
                tags: tags,
                followersCount: followersCount,
                followingCount: followingCount
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