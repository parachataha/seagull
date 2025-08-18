"use server"

import prisma from "@/lib/db";
import { BlogWithDocsBasic } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema } from "@/schemas/user"
import { Blog } from "@prisma/client";

/**
 * Used to fetch all basic blog details owned by a user 
 */

export default async function getUserBlogs({
    userSlug
} : {
    userSlug : string
}) : Promise<ServerResponse<{blogs: BlogWithDocsBasic[], user: { name: string, id: number }}>> {
    
    try {

        if (!slugSchema.safeParse(userSlug.trim().replaceAll(" ", "-").toLowerCase()).success) {
            return { success: false, msg: "Invalid user slug", status: 400 };
        }

        const owner = await prisma.user.findUnique({
            where: {
                slug: userSlug.trim().replaceAll(" ", "-").toLowerCase()
            },
            select: {
                name: true,
                id: true,
                slug: true
            }
        })

        if (!owner) throw new Error("Internal database error occurred fetching user id")

        const blogs = await prisma.blog.findMany({
            where: {
                userId: owner.id,
            },
            orderBy: {
                createdAt: "asc",
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                organizationId: true,
                teamId: true,
                thumbnailId: true,
                pinnedDocId: true,

                docs: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        blogId: true,
                        createdAt: true,
                        updatedAt: true,
                        isPublished: true,
                        order: true,
                    },
                    orderBy: {
                        order: "asc",
                    }
                }
            }
        })

        if (!blogs) throw new Error("Internal database error occurred fetching user blogs")

        if (blogs.length === 0) {
            return {  
                success: true,
                msg: "User has no blogs", 
                status: 404, 
                data: { 
                    blogs: [],  
                    user: {
                        name: owner.name,
                        id: owner.id,
                    }
                } 
            }
        }

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                blogs: blogs,
                user: {
                    id: owner.id,
                    name: owner.name,
                }
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}