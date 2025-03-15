"use server"
import { UTApi } from "uploadthing/server";

// Utils
import base64ToFile from "@/utils/base64ToFile";

const uploadthingApi = new UTApi();

interface Data {
    src: any,
    size: number,
    type: string,
    name: string
}
interface Restrictions {
    maxSize: number,
    formats: string[], // eg ["image", "video"]
    types: string[] // eg ["png", "svg", "ico"]
}
interface Result {

}

export default async function uploadFile(data : Data, restrictions : Restrictions) {

    
    
    const validFile = base64ToFile(data.src, data.name)
    
    console.log(validFile)

    const uploadedFiles = await uploadthingApi.uploadFiles(validFile);
    return uploadedFiles;

}