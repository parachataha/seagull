"use server"

import { query } from "../database"
import getUserTags from "./getUserTags"
import countUserFollowers from "./countUserFollowers"
import countUserFollowing from "./countUserFollowing"
import getUserFollowed from "./getUserFollowed"
import getUserFollowers from "./getUserFollowers"

// Types
import { User } from "@/types/auth"
import { UserTag } from "@/types/user_tag"
import { UserFollower } from "@/types/user_follower"
import { UserFollowed } from "@/types/user_followed"

type Result = {
    success: false,
    status: number,
    msg: string,
} | 
{
    success: true,
    status: number,
    msg: string,
    user: User
}

export default async function getUser(slug : string) : Promise<Result> {

    try {

        // FETCH USER BASIC DATA
        const cols = [slug]
        const rows = await query(`
            SELECT 
                id, 
                slug, 
                first_name, 
                last_name, 
                created_at,
                avatar,
                onboarding,
                hireable,
                about
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
        
        // STORE USER BASIC DATA
        const userBasicData = rows.rows[0]

        // FETCH TAGS
        const userTagsData = await getUserTags(userBasicData.id)

        let tags : UserTag[] = []

        if (userTagsData.success && userTagsData.data) {
            tags = userTagsData.data;
        }

         // FETCH FOLLOWER AND FOLLOWED COUNTS
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

        // FETCH FOLLOWERS 
        let followers : UserFollower[] = []
        
        if (followingCount) {
            const userFollowers = await getUserFollowers(userBasicData.id)

            if (userFollowers.success && userFollowers.data) {
                followers = userFollowers.data;
            }
        }

        // FETCH FOLLOWED 
        let followed : UserFollowed[] = []

        if (followersCount) {
            const userFollowers = await getUserFollowed(userBasicData.id)

            if (userFollowers.success && userFollowers.data) {
                followed = userFollowers.data;
            }
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
                avatar: userBasicData.avatar,
                onboarding: userBasicData.onboarding,
                hireable: userBasicData.hireable,
                about: userBasicData.about,
                tags: tags,
                followersCount: followersCount,
                followingCount: followingCount,
                followers: followers,
                followed: followed
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