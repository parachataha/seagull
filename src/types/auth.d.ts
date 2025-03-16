import { Experience } from "./experience";
import { Organization } from "./organization/organization";
import { UserFollowed } from "./user_followed";
import { UserFollower } from "./user_follower";
import { UserTag } from "./user_tag";

export type SessionValidationResult = 
    | { session: Session; user: User } 
    | { session: null; user: null };

export interface Session { 
    id: string,
    userId: number,
    createdAt: Date,
    expiresAt: Date
}

export interface User {
    id: number,
    firstName: string,
    lastName: string, 
    email?: string,
    slug: string,
    createdAt?: string | null | Date,
    avatar: number,
    avatar_url,
    onboarding: number | null,
    hireable: boolean | null,
    about: string | null,

    tags: UserTag[] | [],

    followingCount: number | 0,
    followersCount: number | 0,
    followers: UserFollower[] | [],
    followed: UserFollowed[] | []

    experience: Experience[],

    organizations?: Organization[] | undefined,
}

