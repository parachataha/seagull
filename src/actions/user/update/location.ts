"use server"
// Lib
import prisma from "@/lib/db"

// Server actions
import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"

// Schemas
import { locationSchema } from "@/schemas/user"

/**
 * First validates the user cookie, and updates the authenticated user's location
 */
export default async function updateLocation( { oldLocation, newLocation, userAgent } : { oldLocation: string | null, newLocation: string | null, userAgent: string | null } ) {

    try {

        /**
         * Ensure both old and new slugs are valid data
         */
        if (oldLocation && !locationSchema.safeParse(oldLocation.trim()).success) return { success: false, msg: "Invalid old location", status: 400 }
        if (newLocation && !locationSchema.safeParse(newLocation.trim()).success) return { success: false, msg: "Invalid location", status: 400 }

        /**
         * Return if no changes made
         */
        if (oldLocation?.trim() === newLocation?.trim()) return { success: true, msg: "Not modified", status: 304, data: { user: { location: newLocation?.trim() || null } } }

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
        if (user.location?.trim() === newLocation?.trim()) return { success: true, msg: "Not modified", status: 304 }
        if (user.location && user.location?.trim() !== oldLocation?.trim()) { 
            invalidateSession()
            return { success: false, msg: "User provided slug does not match database", status: 400 }
        }

        /**
         * Update the database
         */
        const result = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                location: newLocation?.trim() || null
            }
        })

        if (!result) throw new Error("Database internal error")

        return { 
            success: true, 
            msg: "Slug updated successfully",
            status: 200,
            data: {
                user: {
                    location: newLocation?.trim() || null
                }
            }
        };

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}