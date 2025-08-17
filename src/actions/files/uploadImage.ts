"use server";

import { ServerResponse } from "@/lib/types/ServerResponse";
import { imageDescriptionSchema } from "@/schemas/image";
import { userAgentSchema } from "@/schemas/user";
import uploadFile from "./uploadFile";

export type UpdateImageProps = {
    // Track userAgent for security
    userAgent: string | null;
    // file received from the client
    file: File;
    // File description if any
    description?: string;
    // Max size in bytes
    maxSize?: number;
};

/**
 * Strips metadata from image and validates type/format
 */
export default async function uploadImage({
    userAgent,
    file,
    description,
    maxSize = 500000, // 500KB 
}: UpdateImageProps) : 
    Promise<ServerResponse<
        { 
            image: {
                name: string; 
                size: number; 
                description?: string 
            }
        }>> {
    
    console.log(file.name, file.size)

    const allowedType = "image"
    const allowedFormats: string[] = [
        "jpg", "jpeg", "png", "gif", "webp", "avif", "svg", "bmp", "ico", "tiff", "heic", "heif"
    ];

    try {

        // Validate user agent
        if (userAgent && !userAgentSchema.safeParse(userAgent)) {
            return { success: false, msg: "Invalid user agent passed", status: 400 } 
        }

        if (!file) {
            return { success: false, msg: "No file provided.", status: 400 };
        }

        if (description && !imageDescriptionSchema.safeParse(description).success) {
            return { success: false, msg: "Invalid image description", status: 400 }
        }   

        // Ensure the file is not too big
        if (file.size > maxSize) { 
            return { success: false, msg: `${file?.name || "X"} file is too large as it is ${file?.size || "Y"} bytes. The max size is ${maxSize} bytes`, status: 400 }
        }

        // Validate MIME type
        if (!file.type.startsWith(allowedType + "/")) {
            return { success: false, msg: `Invalid file type. Expected ${allowedType}.`, status: 400 };
        }

        // Validate file extension
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (!ext || !allowedFormats.includes(ext)) {
            return { success: false, msg: `Invalid file format. Allowed: ${allowedFormats.join(", ")}`, status: 400 };
        }

        /**
         * Upload file to UploadThing storage
         */
        const result = await uploadFile(file)

        return { success: false, msg: "This function does not exist yet", status: 404 }
        
    } catch (err: any) {

        return {
            success: false,
            msg: err?.message || "Failed to process images",
            status: 500
        };

    }
}
