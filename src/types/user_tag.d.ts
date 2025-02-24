export type UserTag = {
    id: number,
    userId: number, 
    createdAt: Date | string,
    type: "label" | "service" | "skill",
    verified: boolean,
    value: string,
    link: string | null,
    tagOrder: number | null
}