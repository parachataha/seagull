"use server"

import prisma from "@/lib/db";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { blogDescriptionSchema, blogSlugSchema, blogTitleSchema } from "@/schemas/blog";
import { fileSchema } from "@/schemas/image";
import { idSchema, userAgentSchema } from "@/schemas/user";
import validateSession from "../auth/validateSession";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog } from "@prisma/client";

export default async function createBlog({
    userAgent,
    title,
    description,
    slug,
    thumbnail,
    userId,
} : {
    userAgent: string | null;
    title: string,
    description: string,
    slug: string,
    thumbnail: File | null,
    userId?: number 
}) : Promise<ServerResponse<Blog>> {

    try {

        /**
         * Validate user inputs and headers
         */
        if (userAgent && !userAgentSchema.safeParse(userAgent).success) {
            return { success: false, msg: "Invalid user agent", status: 400 }
        }

        if (!blogTitleSchema.safeParse(title.trim()).success) {
            return { success: false, msg: "Invalid title", status: 400 }
        }

        if (!blogDescriptionSchema.safeParse(description.trim()).success) {
            return { success: false, msg: "Invalid description", status: 400 }
        }

        if (!blogSlugSchema.safeParse(slug.trim().replaceAll(" ", "").toLowerCase()).success) {
            return { success: false, msg: "Invalid slug URL", status: 400 }
        }

        if (thumbnail && !fileSchema.safeParse(thumbnail).success) { 
            return { success: false, msg: "Invalid file", status: 400 }
        }

        if (userId && !idSchema.safeParse(userId).success) {
            return  { success: false, msg: "Invalid user ID", status: 400 }
        }

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user : PublicSafeUser = sessionResult.data.user

        let finalUserId = userId

        if (!userId) {
            finalUserId = user.id
        }

        if (userId && user.id !== userId) {
            return { success: false, msg: "Not authorized to create blog on behalf of this user", status: 401 }
        }

        const result = await prisma.blog.create({
            data: {
                title: title.trim(),
                slug: slug.trim().replaceAll(" ", "").toLowerCase(),
                description: description.trim(),
                createdAt: Math.floor(new Date().getTime() / 1000),
                userId: finalUserId 
            }
        })

        if (!result) throw new Error("Database internal error occurred creating blog")

        return {
            success: true,
            msg: "Blog created successfully",
            status: 200,
            data: {
                id: result.id,
                title: result.title,
                slug: result.slug,
                description: result.description,
                userId: result.userId,
                teamId: result.teamId,
                organizationId: result.organizationId,
                thumbnailId: result.thumbnailId,
                pinnedDocId: null,
                createdAt: result.createdAt,
                updatedAt: null,
            }
        }

    } catch (error : any) {

        if (error.code === "P2002") return { 
            success: false, 
            msg: "You already have a blog with that slug",
            status: 409,
        }

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }


    }

}