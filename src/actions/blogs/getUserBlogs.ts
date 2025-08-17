"use server"

import prisma from "@/lib/db";
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
}) : Promise<ServerResponse<{blogs: Blog[], user: { name: string, id: number }}>> {
    
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
            }
        })

        if (!owner) throw new Error("Internal database error occurred fetching user id")

        const blogs = await prisma.blog.findMany({
            where: {
                userId: owner.id
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
                        id: owner.id
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
                    name: owner.name
                }
            }
        }

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}