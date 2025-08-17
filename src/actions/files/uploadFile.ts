// ~/server/actions/uploadFile.ts
"use server";

import { utapi } from "@/lib/uploadThing";
import { ServerResponse } from "@/lib/types/ServerResponse";

/**
 * Upload a file using UploadThing UTApi
 * Can be used inside other server actions
 */
export default async function uploadFile(
  file: File
): Promise<ServerResponse<{ url: string }>> {

    console.log("UPLOAD THING TESTING")

    try {
    // UTApi expects either File[] or FormData
    const uploaded = await utapi.uploadFiles(file);

    console.log("UPLOADED DATA: ", uploaded.data, "UPLOADED ERROR: ", uploaded.error)

    if (!uploaded || !uploaded.data) {
        return {
            success: false,
            msg: "Upload failed",
            status: 500,
        };
    }

    console.log("SUP")

    return {
        success: true,
        msg: "File uploaded successfully",
        status: 200,
        data: {
            url: uploaded.data.ufsUrl,
        },
    };
    } catch (err: any) {
        console.error("UploadThing error:", err);
        return {
            success: false,
            msg: err.message ?? "UploadThing error",
            status: 500,
        };
    }
}
