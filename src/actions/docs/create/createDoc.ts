"use server"

import validateSession from "@/actions/auth/validateSession";
import uploadThing from "@/actions/files/uploadThing";
import prisma from "@/lib/db";
import { DocWithThumbnail } from "@/lib/types/Blog";
import { ServerResponse } from "@/lib/types/ServerResponse"

// Types
import { JSONContent } from "@tiptap/react";

// Schemas
import { blogSlugSchema, blogTitleSchema, bodySchema } from "@/schemas/blog";
import { fileSchema, imageDescriptionSchema } from "@/schemas/image";

export default async function createDoc({
    userAgent = null,

    title,
    body,
    slug,
    blogSlug,

    thumbnail,
    thumbnailDesc,

    isPublic = false,
} : {
    userAgent: string | null;

    title: string;
    body: JSONContent | undefined;
    slug: string;
    blogSlug: string;

    thumbnail: File,
    thumbnailDesc: string;

    isPublic: boolean;
}) : Promise<ServerResponse<{ doc: DocWithThumbnail }>> {

    try { 

        console.log("before: ", body, typeof body);

        const cleanedBody = body;

        if (!cleanedBody) return { success: false, msg: "Invalid body", status: 400 }

        if (!blogTitleSchema.safeParse(title.trim()).success) return { success: false, msg: "Invalid title", status: 400 }
        if (!bodySchema.safeParse(cleanedBody).success) return { success: false, msg: "Body is not valid", status: 400 }

        if (thumbnail && !fileSchema.safeParse(thumbnail).success) return { success: false, msg: "Invalid thumbnail", status: 400 }
        if (thumbnailDesc && !imageDescriptionSchema.safeParse(thumbnailDesc).success) return { success: false, msg: "Invalid thumbnail description", status: 400 }

        // Validate slugs
        if (!blogSlugSchema.safeParse(slug.trim().replaceAll(" ","-").toLowerCase()).success) return { success: false, msg: "Invalid document slug", status: 400 }
        if (!blogSlugSchema.safeParse(blogSlug.trim().replaceAll(" ","-").toLowerCase()).success) return { success: false, msg: "Invalid blog slug", status: 400 }

        if (typeof isPublic !== "boolean") return { success: false, msg: "Invalid draft/public settings", status: 400 }

        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status };
        
        const user = sessionResult.data.user;

        if (!user) return { success: false, msg: 'Unauthorized', status: 403 };

        const createdAt = Math.floor(Date.now() / 1000);

        let successMsg = "Document created successfully"
        let imageUrl : string | null = "";
        
        /**
         * Store document data 
         */
        const result = await prisma.doc.create({
            data: {
                title: title.trim(),
                body: cleanedBody,
                createdAt,
                slug: slug.trim().replaceAll(" ","-").toLowerCase(),
                blog: {
                    connect: {
                        slug: blogSlug,
                    }
                },
            }
        })

        /**
         * Upload image to UploadThing
         */
        const uploadThingResult = await uploadThing({
            createdAt,
            userAgent: userAgent || null,
            file: thumbnail,
        })

        if (!uploadThingResult.success) {
            successMsg = "Document created successfully however thumbnail could not be uploaded"
            imageUrl = null; 
        }
        else {
            imageUrl = `${uploadThingResult.data.url}`;
            
            const imageDBResult = await prisma.image.create({
                data: {
                    userId: user.id,
                    name: "document thumbnail",
                    url: imageUrl.trim(),
                    description: thumbnailDesc.trim() || null,
                    size: thumbnail.size,
                    createdAt,
                    Doc: {
                        connect: {
                            id: result.id
                        }
                    },
                }
            })
            if (!imageDBResult) successMsg = "Document created and thumbnail uploaded, however image could not be connected to document. Please contact support"
        }

        return {
            success: true,
            msg: successMsg,
            status: 200,
            data: {
                doc: {
                    ...result,
                    thumbnail: {
                        url: `${imageUrl}`,
                        description: thumbnailDesc?.trim() || null
                    }
                }
            }
        }

        
    } catch (error : any) {

        if (error.code === "P2002") return { 
            success: false, 
            msg: "You already have a document in this blog with that URL. Please change it and try again",
            status: 409,
        }
        if (error.code === "P2006") {
            return {
                success: false,
                msg: "Your content is too deeply nested that it will break our poor old system! This is often found in your bullet points, tables or general structure and try again.",
                status: 400,
            }
        }


        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500, error: error }

    }

}