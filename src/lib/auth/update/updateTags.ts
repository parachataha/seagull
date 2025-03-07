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
    
    // AUTHENTICATE USER
    const currentUser = await getCurrentSession()
    
    if (!currentUser) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    if (!currentUser.user || !currentUser.session) return { success: false, msg: "Sorry, you're not authenticated", status: 403 }
    
    const currentTags  : UserTag[] = currentUser.user.tags
    
    try {
        
        let allUpdateTags : Data = []
        let allInsertTags : Data = []
        let allDeleteTags : Data = []

        function sortTags(user: User, type : "label" | "service" | "skill") {

            const newTags  : Data = data.filter((tag) => tag.type === type)
            const currentTags : UserTag[] = user.tags.filter((tag) => tag.type === type) 
            let updateTags : Data = []
            let insertTags : Data = []
            let deleteTags : Data = []
            
            if (newTags.length > currentTags.length) {
                // More tag
                newTags.forEach((tag, index) => {
    
                    if (index + 1 <= currentTags.length) {
                        // NewTag index exists within CurrentTags
                        
                        if (tag.value !== currentTags[index].value) {
                            // NewTag is completely new
                            updateTags.push( {...tag, id: currentTags[index].id } )
                        }
    
                    } else {
                        // NewTag index too large
                        insertTags.push(tag)
                    }
                })
            } else if (newTags.length < currentTags.length) {
                // Fewer tags
                currentTags.forEach((tag, index) => {
    
                    if (index > newTags.length - 1) {
    
                        // Tag no longer exists
                        deleteTags.push(tag)
                        
                    } else {
    
                        if (tag.value !== newTags[index].value) {
                            // Tag was edited
                            updateTags.push({...newTags[index], id: tag.id})
                        }
    
                    }
                })
            } else {
                
                newTags.forEach((tag, index) => {
                    if (tag.value !== currentTags[index].value) {
                        updateTags.push({...tag, id: currentTags[index].id})
                    }
                })

            }

            allUpdateTags.push(...updateTags)
            allInsertTags.push(...insertTags)
            allDeleteTags.push(...deleteTags)

        }

        sortTags(currentUser.user, "label")
        sortTags(currentUser.user, "service")
        sortTags(currentUser.user, "skill")

        // console.log("updated: ", allUpdateTags)
        // console.log("inserted: ", allInsertTags)
        // console.log("deleted: ", allDeleteTags)

        let finalUpdateTags = []
        let finalInsertTags = []

        for (let i = 0; i <= allUpdateTags.length - 1; i++) {
            finalUpdateTags.push({...allUpdateTags[i], created_at: new Date(), tag_order: i})
        }

        for (let i = allUpdateTags.length; i <= allUpdateTags.length + allInsertTags.length - 2; i++) {
            finalInsertTags.push({...allInsertTags[i], created_at: new Date(), tag_order: i})
        }

        // console.log("final updated: ", finalUpdateTags)
        // console.log("final inserted: ", finalInsertTags)

        let updateResult : boolean[] = []
        let insertedResult : boolean[] = []
        let deletedResult : boolean[] = []

        for (const tag of finalUpdateTags) {

            const cols = [tag.created_at, tag.type, tag.value, tag.tag_order, tag.id]
            const result = await query(`
                UPDATE user_tags 
                SET created_at = $1, type = $2, value = $3, tag_order = $4
                WHERE id = $5
            `, cols)

            if (!result) {
                throw `A database error occurred when updating ${tag.value}`
            }

            if (result.rowCount == 1) {
                updateResult.push(true)
            } else {
                updateResult.push(false)
            }
            
        }

        for (const tag of finalInsertTags) {

            const cols = [currentUser.user.id, tag.created_at, tag.type, tag.value, tag.tag_order]
            const result = await query(`
                INSERT INTO user_tags (user_id, created_at, type, value, tag_order)
                VALUES ($1, $2, $3, $4, $5)
            `, cols)

            console.log(result)

            if (!result) {
                throw `A database error occurred when inserting ${tag.value}`
            }

            if (result.rowCount == 1) {
                insertedResult.push(true)
            } else {
                insertedResult.push(false)
            }
            
        }

        for (const tag of allDeleteTags) {

            const cols = [tag.id]
            const result = await query(`
                DELETE FROM user_tags WHERE id = $1
            `, cols)

            if (!result) {
                throw `A database error occurred when deleting ${tag.id}`
            }

            if (result.rowCount == 1) {
                deletedResult.push(true)
            } else {
                deletedResult.push(false)
            }
            
        }

        if (updateResult.filter((result) => !result).length !== 0) {

            return { 
                success: false, 
                msg: "Some tags failed to update",
                status: 500
            }
            
        } else {

            return { 
                success: true, 
                msg: "Tags updated",
                status: 200
            }

        }


    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}