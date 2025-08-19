"use server";

// Types & schemas
import { ServerResponse } from "@/lib/types/ServerResponse";
import { fileSchema, imageDescriptionSchema } from "@/schemas/image";
import { userAgentSchema } from "@/schemas/user";

// Lib
import { utapi } from "@/lib/uploadThing";
import prisma from "@/lib/db";

// Server actions
import validateSession from "../auth/validateSession";

/**
 * Upload a file using UploadThing UTApi BUT DOES NOT create the postgreSQL database row to track user limits
 * Only to be used inside other server actions as users are not validated
 */

type fileExtensions = (string | "png" | "jpg" | "jpeg" | "gif" | "bmp" | "webp" | "tiff" | "svg" | "mp4" | "mov" | "avi" | "mkv" | "webm" | "flv" | "wmv" | "m4v")

export default async function uploadThing( {
    file,
    description = null,
    userAgent = null,
    requirements = {
        maxSize: 1_000_000, // 1000 kilobytes
        allowedType: "image",
        allowedFormats: ["png", "jpg", "jpeg", "bmp", "webp", "tiff", "svg"]
    }
} : {
    file: File;
    description: string | null;
    userAgent: string | null;
    createdAt?: number;
    requirements?: {
        maxSize?: number;
        allowedType?: "image" | "video"
        allowedFormats?: fileExtensions[]
    }
}): Promise<ServerResponse<{ url: string }>> {

    const {
        maxSize = 1_000_000,
        allowedType = "image",
        allowedFormats = ["png", "jpg", "jpeg", "bmp", "webp", "tiff", "svg"]
    } = requirements;

    try {

        /**
         * Validate user agent and data
         */
        if (userAgent && !userAgentSchema.safeParse(userAgent)) {
            return { success: false, msg: "Invalid user agent passed", status: 400 } 
        }

        if (!file || !fileSchema.safeParse(file).success) {
            return { success: false, msg: "Invalid file provided.", status: 400 };
        }

        if (description && !imageDescriptionSchema.safeParse(description).success) {
            return { success: false, msg: "Invalid image description", status: 400 }
        }   

        // Ensure the file is not too big
        if (file.size > maxSize) { 
            return { success: false, msg: `${file?.name || "X"} file is too large as it is ${file?.size || "Y"} bytes. The max size is ${maxSize} bytes`, status: 400 }
        }

        // Validate type and format
        if (!file.type.startsWith(allowedType + "/")) {
            return { success: false, msg: `Invalid file type. Expected ${allowedType}.`, status: 400 };
        }

        // Validate file extension
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (!ext || !allowedFormats.includes(ext)) {
            return { success: false, msg: `Invalid file format. Allowed: ${allowedFormats.join(", ")}`, status: 400 };
        }

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user = sessionResult.data.user

        if (!user) return { success: false, msg: "Unauthenticated", status: 403 }
        
        /**
         * Upload file to UploadThing storage
         */
        const uploaded = await utapi.uploadFiles(file);

        if (!uploaded || !uploaded.data) {
            // Check if uploaded successfully
            return {
                success: false,
                msg: "Upload failed",
                status: 500,
            };
        }
    

        return {
            success: true,
            msg: "File uploaded successfully",
            status: 200,
            data: {
                url: uploaded.data.ufsUrl,
            },
        };

    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            msg: err.message ?? "UploadThing error",
            status: 500,
        };
    }
}
