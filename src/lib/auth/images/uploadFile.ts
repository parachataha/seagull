"use server"
import { UTApi } from "uploadthing/server";
import { query } from "@/lib/database";
import { getCurrentSession } from "../cookies/getCurrentSession";
const uploadthingApi = new UTApi();

// Utils
import base64ToFile from "@/utils/base64ToFile";
import generateFileName from "./generateFileName";

// Types
import { Use } from "@/types/images/use";

interface Data {
    src: any,
    size: number,
    type: string,
    name: string,
}
interface Restrictions {
    maxSize: number,
    formats: string[], // eg ["image", "video"]
    types: string[] // eg ["png", "svg", "ico"]
}
type Result = {
    success: false,
    msg: string,
    status: number,
} | {
    success: true,
    msg: string,
    status: number,
    file: {
        id: number;
        type?: string | undefined;
        name?: string | undefined;
        size?: number | undefined;
        lastModified?: number | undefined;
        customId?: string | null | undefined;
        key?: string | undefined;
        url?: string | undefined;
        appUrl?: string | undefined;
        ufsUrl?: string | undefined;
    }
}

export default async function uploadFile(data : Data, restrictions : Restrictions, use : Use) : Promise<Result> {

    if (data.size > restrictions.maxSize) return { success: false, msg: "File is too large", status: 400 } 
    
    let acceptedFormat : boolean = false
    restrictions.formats.forEach((format) => {
        if (data.type.split("/")[0] === format) acceptedFormat = true
    })

    let acceptedType
    restrictions.types.forEach((type) => {
        if (data.type.split("/")[1] === type) acceptedType = true
    })

    if (!acceptedFormat) return { success: false, msg: "Invalid file", status: 400 } 
    if (!acceptedType) return { success: false, msg: "Invalid file type", status: 400 } 

    console.log(data.name)

    if (!data.name || data.name.trim().length < 2) return { success: false, msg: "Invalid file name", status: 400 } 
    if (data.name.length > 99) return { success: false, msg: "File name is too long", status: 400 } 

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession();

    if (!currentUser || !currentUser.user || !currentUser.session) return { success: false, msg: "Not authenticated", status: 403 } 
    
    const fileName = generateFileName(currentUser.user.id, `${data.name.split(".")[0]}`, use, `.${data.type.split("/")[1]}`)
    const validFile = base64ToFile(data.src, fileName)

    try {

        const uploadedFiles = await uploadthingApi.uploadFiles(validFile);

        const cols = [currentUser.user.id, uploadedFiles.data?.ufsUrl, fileName.trim().replaceAll(" ", "-"), data.size, new Date()]
        const dbResult = await query(`
            INSERT INTO images (user_id, url, name, size, created_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `, cols)

        if (!dbResult || dbResult.rowCount !== 1) return { success: false, msg: "Image has been uploaded but not inserted to database", status: 400 }

        const id = dbResult.rows[0].id

        return { success: true, msg: "File uploaded", status: 200, file: { ...uploadedFiles.data, id: id} };

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}