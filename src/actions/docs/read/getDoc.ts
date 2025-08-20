"use server"

import prisma from "@/lib/db";
import { DocWithThumbnailAndBlogBasics } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema } from "@/schemas/user"

/**
 * Used to fetch all doc information
 */

export default async function getDoc({
    blogSlug,
    docSlug
} : {
    blogSlug : string;
    docSlug : string;
}) : Promise<ServerResponse<{doc: DocWithThumbnailAndBlogBasics}>> {
    
    try {

        if (!slugSchema.safeParse(blogSlug.trim().replaceAll(" ", "-").toLowerCase()).success) {
            return { success: false, msg: "Invalid blog slug", status: 400 };
        }

        if (!slugSchema.safeParse(docSlug.trim().replaceAll(" ", "-").toLowerCase()).success) {
            return { success: false, msg: "Invalid document slug", status: 400 };
        }

        /**
         * Get blog id
         */
        const blogId = await prisma.blog.findUnique({
            where: {
                slug: blogSlug.trim().replaceAll(" ", "-").toLowerCase()
            },
            select: {
                id: true
            }
        })

        if (!blogId) return { success: false, msg: "This blog does not exist", status: 404 };

        const doc = await prisma.doc.findUnique({
            where: {
                blogId_slug: {
                    slug: docSlug.trim().replaceAll(" ", "-").toLowerCase(),
                    blogId: blogId.id,
                }
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                isPublished: true,
                body: true,
                blog: {
                    select: {
                        slug: true,
                        title: true,
                        thumbnail: {
                            select: {
                                url: true
                            }
                        },
                        author: {
                            select: {
                                name: true,
                                slug: true
                            },
                        }
                    },
                },
                thumbnail: {
                    select: {
                        url: true,
                        description: true,
                    }
                },
            }
        })

        if (!doc) return { success: false, msg: "This document does not exist", status: 404 }

        return {
            success: true,
            msg: "User blogs found",
            status: 200,
            data: {
                doc: doc,
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}