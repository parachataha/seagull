"use server"
// Lib
import prisma from "@/lib/db"

// Server actions
import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"

// Schemas
import { locationSchema } from "@/schemas/user"

/**
 * First validates the user cookie, and updates the authenticated user's timezone
 */
export default async function updateTimezone( { oldTimezone, newTimezone, userAgent } : { oldTimezone: string | null, newTimezone: string | null, userAgent: string | null } ) {

    try {

        /**
         * Ensure both old and new slugs are valid data
         */
        if (oldTimezone?.trim() && !locationSchema.safeParse(oldTimezone.trim()).success) return { success: false, msg: "Invalid old timezone", status: 400 }
        if (newTimezone?.trim() && !locationSchema.safeParse(newTimezone.trim()).success) return { success: false, msg: "Invalid timezone", status: 400 }

        /**
         * Return if no changes made
         */
        if (oldTimezone?.trim().toUpperCase() === newTimezone?.trim().toUpperCase()) return { success: true, msg: "Not modified", status: 304, data: { user: { timezone: newTimezone?.trim() || null } } }

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
        if (user.timezone?.trim().toUpperCase() === newTimezone?.trim().toUpperCase()) return { success: true, msg: "Not modified", status: 304 }
        if (user.timezone && user.timezone?.trim().toUpperCase() !== oldTimezone?.trim().toUpperCase()) { 
            console.log(user.timezone?.trim().toUpperCase(), oldTimezone?.trim().toUpperCase())
            invalidateSession()
            return { success: false, msg: "User provided timezone does not match database", status: 400 }
        }

        /**
         * Update the database
         */
        const result = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                timezone: newTimezone?.trim().toUpperCase() || null
            }
        })

        if (!result) throw new Error("Database internal error")

        return { 
            success: true, 
            msg: "Timezone updated successfully",
            status: 200,
            data: {
                user: {
                    timezone: newTimezone?.trim() || null
                }
            }
        };

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}