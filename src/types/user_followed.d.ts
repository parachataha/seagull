export type UserFollowed = {
    id: number,
    follower: number,
    followed_id: number,
    followed_slug: string,
    followed_first_name: string,
    followed_last_name: string,
    followed_avatar: number,
    followed_avatar_url: string,
    created_at: Date | null | string,
}