"use server"
import { query } from "@/lib/database"
import { getCurrentSession } from "../cookies/getCurrentSession"
import uploadFile from "../images/uploadFile"

// Types
interface Props {
    name: string, 
    slug: string,
    logo: {
        src: any,
        type: string,
        size: number,
        name: string,
    } | null
}

interface Result {
    success: boolean, 
    msg: string,
    status: number,
    data?: {
        slug: string,
        id: number
    }
}

export default async function createOrganization(data : Props) : Promise<Result> {

    if (!data) return { success: false, msg: "No organization data provided", status: 400 }
    if (!data.name || data.name.length < 2) return { success: false, msg: "Please enter a valid name", status: 400 }
    if (data.name.length > 99) return { success: false, msg: "Organization name is too long", status: 400 }
    if (!data.slug || data.slug.length < 2) return { success: false, msg: "Please enter a valid slug", status: 400 }
    if (data.slug.length > 99) return { success: false, msg: "Organization slug is too long", status: 400 }

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    try {

        const cols = [currentUser.user.id, data.name.trim(), data.slug.trim().toLowerCase() ,new Date()]
        const result = await query(`
            INSERT INTO organizations (owner_id, name, slug, created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `, cols)

        if (!result) throw "A database error occurred"

        if (result.rowCount === 0) return { success: false, msg: "Could not create organization", status: 500 }
        
        const organization_id = result.rows[0].id

        // UPLOAD LOGO
        let logo_id = 1
        if (data.logo) {
            const uploadLogoResult = await uploadFile({ 
                    src: data.logo.src,
                    name: data.logo.name,
                    size: data.logo.size,
                    type: data.logo.type
                },
                {
                    maxSize: 5 * 1024 * 1024,
                    formats: ["image"],
                    types: ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg", "apng", "ico", "tiff", "avif"]
                },
                "organization-logo"
            )

            if (uploadLogoResult.success) { logo_id = uploadLogoResult.file.id }
            else return { success: true, msg: uploadLogoResult.msg, status: 400 } 

        }

        if (logo_id !== 1) {
            const updateLogoCols = [logo_id, organization_id]
            const updateLogoResult = await query(`
                UPDATE organizations SET logo_id = $1 WHERE id = $2
            `, updateLogoCols)

            if (!updateLogoResult) return { success: true, msg: "Organization created but could not update logo", status: 500 }
            if (updateLogoResult.rowCount !== 1) return { success: true, msg: "Organization created but could not update logo", status: 500 }
        }

        return { 
            success: true,
            msg: "Organization created successfully",
            status: 200,
            data: {
                id: organization_id,
                slug: data.slug.trim().toLowerCase()
            }
        }

    } catch (error : any) {

        if (error.code === '23505') return {
            success: false,
            msg: "Vanity URL is already in use",
            status: 400
        }

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }
}