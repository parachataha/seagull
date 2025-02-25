export type UserFollower = {
    id: number,
    followed: number,
    followerId: number,
    followerSlug: string,
    followerFirstName: string,
    followerLastName: string,
    followerAvatar: string,
    createdAt: Date | null | string,
}