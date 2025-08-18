"use server"

import prisma from "@/lib/db";
import { BlogWithDocsBasicAndAuthor } from "@/lib/types/Blog";
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
}) : Promise<ServerResponse<{blogs: BlogWithDocsBasicAndAuthor[]}>> {
    
    try {

        if (!slugSchema.safeParse(userSlug.trim().replaceAll(" ", "-").toLowerCase()).success) {
            return { success: false, msg: "Invalid user slug", status: 400 };
        }

        const blogs = await prisma.blog.findMany({
            where: {
                author: {
                    slug: userSlug.trim().toLowerCase().replaceAll(" ", "-")
                }
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

                author: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                },

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
                } 
            }
        }

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                blogs: blogs,
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500, error: error }

    }
}