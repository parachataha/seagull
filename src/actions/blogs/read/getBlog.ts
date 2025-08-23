"use server"

import validateSession from "@/actions/auth/validateSession";
import prisma from "@/lib/db";
import { BlogWithDocsBasicAndAuthorAndThumbnail } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema } from "@/schemas/user"

/**
 * Used to fetch all basic blog details owned by a user 
 */

export default async function getBlog({
    blogSlug,
} : {
    blogSlug : string,
}) : Promise<ServerResponse<{blog: BlogWithDocsBasicAndAuthorAndThumbnail}>> {
    
    try {

        if (!slugSchema.safeParse(blogSlug.trim().replaceAll(" ", "-").toLowerCase()).success) {
            return { success: false, msg: "Invalid blog slug", status: 400 };
        }

        const blog = await prisma.blog.findUnique({
            where: {
                slug: blogSlug.trim().replaceAll(" ","-").toLowerCase()
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
                        thumbnail: {
                            select: {
                                url: true,
                                description: true
                            }
                        }
                    },
                    orderBy: {
                        order: "asc",
                    }
                }
            }
        })

        if (!blog) {
            return {  
                success: false,
                msg: "Blog does not exist", 
                status: 404
            }
        }

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                blog: blog,
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}