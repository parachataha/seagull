export type UserFollowed = {
    id: number,
    follower: number,
    followedId: number,
    followedSlug: string,
    followedFirstName: string,
    followedLastName: string,
    followedAvatar: string,
    createdAt: Date | null | string,
}