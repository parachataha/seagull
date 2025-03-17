"use server"

import { query } from "../database"
import getUserTags from "./getUserTags"
import countUserFollowers from "./connections/countUserFollowers"
import countUserFollowing from "./connections/countUserFollowing"
import getUserFollowed from "./connections/getUserFollowed"
import getUserFollowers from "./connections/getUserFollowers"

// Types
import { User } from "@/types/auth"
import { UserTag } from "@/types/user_tag"
import { UserFollower } from "@/types/user_follower"
import { UserFollowed } from "@/types/user_followed"
import getUserExperience from "./getUserExperience"
import { getCurrentSession } from "../auth/cookies/getCurrentSession"
import { Experience } from "@/types/experience"

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

export default async function getUser(slug : string, isUser?: boolean) : Promise<Result> {

    let currentUser = false;
    if (!isUser) currentUser = false;
    else currentUser = isUser;
    
    try {

        // FETCH USER BASIC DATA
        const cols = [slug]
        const basicRows = await query(`
            SELECT 
                u.id, 
                u.slug, 
                u.first_name, 
                u.last_name, 
                u.created_at,
                u.avatar,
                i.url AS avatar_url,
                u.onboarding,
                u.hireable,
                u.about
            FROM users u
            INNER JOIN images i
                ON i.id = u.avatar
            WHERE slug = $1`,
            cols
        )

        if (!basicRows) {
            return { success: false, status: 400, msg: "Could not fetch user" }
        }
        if (!basicRows.rowCount) {
            return { success: false, status: 404, msg: "User does not exist" }
        }
        
        // STORE USER BASIC DATA
        const basic = basicRows.rows[0]

        // FETCH TAGS
        const tagsData = await getUserTags(basic.id)

        let tags : UserTag[] = []

        if (tagsData.success && tagsData.data) {
            tags = tagsData.data;
        }

         // FETCH FOLLOWER AND FOLLOWED COUNTS
        const followerCountResult = await countUserFollowers(basic.id)
        const followingCountResult = await countUserFollowing(basic.id)

        let followersCount : number = 0
        let followingCount : number = 0

        if (followerCountResult.success && followerCountResult.data) { 
            followersCount = followerCountResult.data
        }

        if (followingCountResult.success && followingCountResult.data) { 
            followingCount = followingCountResult.data
        }

        // FETCH FOLLOWERS 
        let followers : UserFollower[] = []
        
        if (followingCount) {
            const userFollowers = await getUserFollowers(basic.id)

            if (userFollowers.success && userFollowers.data) {
                followers = userFollowers.data;
            }
        }

        // FETCH FOLLOWED 
        let followed : UserFollowed[] = []

        if (followersCount) {
            const userFollowers = await getUserFollowed(basic.id)

            if (userFollowers.success && userFollowers.data) {
                followed = userFollowers.data;
            }
        }

        // FETCH EXPERIENCE
        const experienceResult = await getUserExperience(basic.id, currentUser);
        let experience : Experience[] = [];
        if (experienceResult.success && experienceResult.data) { 
            experience = experienceResult.data
        }

        return {
            success: true,
            msg: "User found",
            status: 200,
            user: {
                slug: basic.slug,
                firstName: basic.first_name,
                lastName: basic.last_name,
                id: basic.id,
                createdAt: basic.created_at,
                avatar: basic.avatar,
                avatar_url: basic.avatar_url,
                onboarding: basic.onboarding,
                hireable: basic.hireable,
                about: basic.about,
                tags: tags,
                followersCount: followersCount,
                followingCount: followingCount,
                followers: followers,
                followed: followed,
                experience: experience
            }
        }

    } catch (error) {

        console.log("[SERVER ACTION] getUser()", error)

        return { 
            success: false, 
            status: 400, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
        }
    }

}