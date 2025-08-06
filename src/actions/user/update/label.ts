"use server"

import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"
import prisma from "@/lib/db"
import { labelSchema } from "@/schemas/user"

/**
 * First validates the user cookie, and updates the authenticated user's label
 */
export default async function updateLabel( { oldLabel, newLabel, userAgent } : { oldLabel: string | null, newLabel: string, userAgent: string | null } ) {

    try {

        /**
         * Ensure both old and new labels are valid data
         */
        if (oldLabel && !labelSchema.safeParse(oldLabel).success) return { success: false, msg: "Invalid old label", status: 400 }
        if (!labelSchema.safeParse(newLabel.trim()).success) return { success: false, msg: "Invalid label", status: 400 }

        /**
         * Return if no changes made
         */
        if (oldLabel?.trim() === newLabel.trim()) return { success: true, msg: "Not modified", status: 304, data: { user: { label: newLabel.trim() } } }

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user = sessionResult.data.user

        /**
         * Return if no changes made
         * Double check oldSlug == database value to prevent attacks
         */
        if (user.label?.trim().toLowerCase() === newLabel.trim().toLowerCase()) return { success: true, msg: "Not modified", status: 304 }
        if (user.label && user.label?.trim().toLowerCase() !== oldLabel?.trim().toLowerCase()) { 
            invalidateSession()
            return { success: false, msg: "User provided label does not match database", status: 400 }
        }

        /**
         * Update the database
         */
        const result = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                label: newLabel.trim()
            }
        })

        if (!result) throw new Error("Database internal error")

        return { 
            success: true, 
            msg: "Label updated successfully",
            status: 200,
            data: {
                user: {
                    label: newLabel.trim()
                }
            }
        };

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}