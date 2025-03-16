export type UserFollower = {
    id: number,
    followed: number,
    follower_id: number,
    follower_slug: string,
    follower_first_name: string,
    follower_last_name: string,
    follower_avatar: number,
    follower_avatar_url: string,
    created_at: Date | null | string,
}