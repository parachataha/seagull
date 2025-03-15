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
    status: number
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

        const cols = [currentUser.user.id, data.name, data.slug,  ,new Date()]
        const result = await query(`
            INSERT INTO organizations (owner_id, name, slug, logo_id, created_at)
            VALUES ($1, $2, $3, $4, $5)
        `, cols)

        if (!result) throw "A database error occurred"

        if (result.rowCount === 0) return { success: false, msg: "Could not create organization", status: 500 }

        return { 
            success: true,
            msg: "User about information updated successfully",
            status: 200,
        }

    } catch (error : any) {

        if (error.code === '23505') return {
            success: false,
            msg: "Slug already used",
            status: 400
        }

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }
}