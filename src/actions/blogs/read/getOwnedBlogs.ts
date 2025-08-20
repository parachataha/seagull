"use server"

import validateSession from "@/actions/auth/validateSession";
import prisma from "@/lib/db";
import { BlogWithDocsBasicAndAuthorAndThumbnail } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema } from "@/schemas/user"
import { Blog } from "@prisma/client";

/**
 * Used to fetch all basic blog details owned by a user 
 */

export default async function getOwnedBlogs({
    userAgent
} : {
    userAgent: string | null;
}) : Promise<ServerResponse<{user: { blogs: BlogWithDocsBasicAndAuthorAndThumbnail[],  }}>> {
    
    try {

        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user = sessionResult.data.user

        const blogs = await prisma.blog.findMany({
            where: {
                userId: user.id,
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

                thumbnail: {
                    select: {
                        url: true
                    }
                },

                author: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
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
                    user: {
                        blogs: [],  
                    }
                } 
            }
        }

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                user: {
                    blogs: blogs
                }
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}