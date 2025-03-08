"use server"

import { query } from "@/lib/database"
import { getCurrentSession } from "../cookies/getCurrentSession"
import updateOnboarding from "./updateOnboarding"
import { UserTag } from "@/types/user_tag"
import { User } from "@/types/auth"

type Data = { value: string, type: "label" | "service" | "skill" | undefined, id?: number, created_at?: Date | string, tag_order?: number }[]

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

        if (tag.value.length > 25) {
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
    
    const newTags = [...labelTags, ...serviceTags, ...skillTags]

    const tagValues = new Set();

    for (const tag of newTags) {
        if (tagValues.has(tag.value)) {
            return { success: false, msg: "Duplicate tags found", status: 403 };
        }
        tagValues.add(tag.value);
    }

    
    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()
    
    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    
    try {

        const deleteCols = [currentUser.user.id]
        const result = await query("DELETE FROM user_tags WHERE user_id = $1", deleteCols)

        if (!result) throw "A database error occurred when deleting previous tags"

        if (currentUser.user.tags.length > 0 && (!result.rowCount || result.rowCount <= 0)) {
            return { success: false, msg: "We could not delete previous tags", status: 500 }
        }

        const timestamp = new Date()

        for (let i = 0; i <= data.length - 1; i++) {

            const insertCols = [currentUser.user.id, timestamp, data[i].type, data[i].value, i]
            const result = await query(`
                INSERT INTO user_tags (user_id, created_at, type, value, tag_order)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id, type, value) DO NOTHING
            `, insertCols)

            if (!result) throw `A database error occurred when inserting ${data[i].value}`
            if (!result.rowCount) return { success: false, msg: `Could not insert ${data[i].value}`, status: 500 }
        }

        return {
            success: true,
            msg: "Successfully updated tags",
            status: 200
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}