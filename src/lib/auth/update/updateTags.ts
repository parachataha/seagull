"use server"

import { query } from "@/lib/database"
import { getCurrentSession } from "../cookies/getCurrentSession"
import updateOnboarding from "./updateOnboarding"
import { UserTag } from "@/types/user_tag"

type Data = { value: string, type: "label" | "service" | "skill" }[]

interface Result {
    success: boolean,
    msg: string, 
    status: number,
    data?: UserTag[]
}

export default async function updateTags( data : Data ) : Promise<Result> {

    if (!data) return { success: false, msg: "Invalid data", status: 400 }
    if (data.length > 60) return { success: false, msg: "You're editing too much in one go", status: 400 }

    data.forEach((tag, index) => {

        if (!tag.value || (tag.type !== "label" && tag.type !== "service" && tag.type !== "skill")) {
            return { success: false, msg: "Invalid data", status: 400 }
        }

        if (tag.value.length < 1) { 
            return { success: false, msg: `Tag ${tag.value} is too short`, status: 400 }
        }

        if (tag.value.length > 50) {
            return { success: false, msg: `Tag ${tag.value} is too long`, status: 400 }
        }

    })

    const labelTags = Array.from(new Set( data.filter(tag => tag.type === "label") ));
    const serviceTags = Array.from(new Set( data.filter(tag => tag.type === "service") ));
    const skillTags = Array.from(new Set( data.filter(tag => tag.type === "skill") ));

    if (labelTags.length > 5) {
        return { success: false, msg: `Too many labels. Please remove some`, status: 400 }
    }

    if (serviceTags.length > 15) {
        return { success: false, msg: `Too many service tags. Please remove some`, status: 400 }
    }

    if (skillTags.length > 40) {
        return { success: false, msg: `Too many skill tags. Please remove some`, status: 400 }
    }

    const allTags = [...labelTags, ...serviceTags, ...skillTags]

    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()

    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }

    try {

        // DELETE OLD TAGS
        const colsDelete = [currentUser.user.id]
        const resultDelete = await query(`
            DELETE FROM user_tags WHERE user_id = $1
        `, colsDelete)

        if (!resultDelete) throw "A database error occurred, we could not delete your old tags"

        if (resultDelete.rowCount === 0 && currentUser.user.tags.length > 0) return { success: false, msg: "No tags were deleted", status: 500 }
        
        // Add new tags and order
        const createdAt = new Date()
        let successfulTags : UserTag[] = []

        allTags.forEach( async (tag, index : number) => {

            const colsAdd = [currentUser.user.id, createdAt, tag.type, false, tag.value, null, index]
            const resultAdd = await query(`
                INSERT INTO user_tags (user_id, created_at, type, verified, value, link, tag_order) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `, colsAdd)

            if (!resultAdd) {
                if (index === 0) return { success: false, msg: `A database error occurred.` }
                else return { success: false, msg: `A database error occurred when inserting the ${tag.type} ${tag}#${index}. Please contact support and try again.` }
            }

            const rows : any = resultAdd.rows
            successfulTags.push( {
                id: rows.id, 
                userId: rows.user_id,
                createdAt: rows.created_at, 
                type: rows.type,
                verified: rows.verified,
                value: rows.value,
                link: rows.link,
                tagOrder: rows.tag_order
            })

        })

        if (currentUser.user.onboarding === 2 || currentUser.user.onboarding === 2) {
            const result = await updateOnboarding(null, currentUser.user.onboarding)
            if (!result.success) { throw result.msg }
        }

        return { 
            success: true, 
            msg: "User tags added successfully", 
            status: 200,
            data: successfulTags
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}