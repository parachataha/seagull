"use server"

import prisma from "@/lib/db";
import { BlogWithDocsBasicAndAuthorAndThumbnail } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema } from "@/schemas/user"

/**
 * Used to fetch 10 blogs 
 */

export default async function getBlogs() : Promise<ServerResponse<{blogs: BlogWithDocsBasicAndAuthorAndThumbnail[]}>> {
    
    try {

        const blogs = await prisma.blog.findMany({
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
                pinnedDocId: true,
                thumbnail: {
                    select: {
                        url: true,
                    }
                },
                author: {
                    select: {
                        name: true,
                        id: true,
                        slug: true
                    },
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
            },
            take: 10
        })

        if (!blogs) throw new Error("Internal database error occurred when fetching blogs")

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                blogs: blogs,
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}