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
    id: number | null,
    firstName: string,
    lastName: string, 
    email?: string,
    slug: string,
    createdAt?: Date | null,
    tags: UserTag[] | undefined 
}