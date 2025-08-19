"use server"
// Lib
import prisma from "@/lib/db";

// Types & schemas
import { ServerResponse } from "@/lib/types/ServerResponse";
import { blogDescriptionSchema, blogSlugSchema, blogTitleSchema } from "@/schemas/blog";
import { fileSchema } from "@/schemas/image";
import { idSchema, userAgentSchema } from "@/schemas/user";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog } from "@prisma/client";

// Server actions
import validateSession from "../../auth/validateSession";
import uploadThing from "@/actions/files/uploadThing";

export default async function createBlog({
    userAgent,
    title,
    description,
    slug,
    thumbnail,
} : {
    userAgent: string | null;
    title: string,
    description: string,
    slug: string,
    thumbnail: File | null,
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

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user : PublicSafeUser = sessionResult.data.user

        if (!user || !user.id) {
            return { success: false, msg: "Not authorized to create blog", status: 403 }
        }

        /**
         * Upload image in uploadThing
         */

        
        let result;
        let successMsg = "Blog created successfully"
        let imageUrl = "";
        
        const createdAt = Math.floor(Date.now() / 1000);

        if (thumbnail) {

            let uploadThingResult = null;

            uploadThingResult = await uploadThing({
                createdAt,
                userAgent: userAgent || null,
                file: thumbnail,
                description: description,
            })

            result = await prisma.blog.create({
                  data: {
                    title: title.trim(),
                    slug: slug.trim().replaceAll(" ", "").toLowerCase(),
                    description: null,
                    createdAt,
                    userId: user.id
                }
            })

            if (!result) throw new Error("Database internal error occurred creating blog")

            if (!uploadThingResult.success) {
                successMsg = `Blog create successfully however thumbnail could not be uploaded due to ${uploadThingResult.msg}`
            } else {
                const imageDBResult = await prisma.image.create({
                    data: {
                        userId: user.id,
                        name: `blog thumbnail`,
                        url: uploadThingResult.data.url,
                        description: null,
                        size: thumbnail.size,
                        createdAt,
                        Blog: {
                            connect: {
                                id: result.id
                            }
                        }
                    }
                })
                imageUrl = uploadThingResult.data.url

                if (!imageDBResult) throw new Error("Database internal error occurred image row in database")
            }


        } else {
            result = await prisma.blog.create({
                data: {
                    title: title.trim(),
                    slug: slug.trim().replaceAll(" ", "").toLowerCase(),
                    description: description.trim(),
                    createdAt,
                    userId: user.id,
                }
            })
        }
        

        if (!result) throw new Error("Database internal error occurred creating blog")

        return {
            success: true,
            msg: successMsg,
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
            msg: "A blog already exists with that URL. Change it and try again",
            status: 409,
        }

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }


    }

}