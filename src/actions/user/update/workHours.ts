"use server"
// Lib
import prisma from "@/lib/db"

// Server actions
import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"

// Schemas
import { workStartSchema, workEndSchema, userAgentSchema } from "@/schemas/user"

/**
 * First validates the user cookie, and updates the authenticated user's work hours
 */
export default async function updateWorkHours( { 
    oldWorkStart, newWorkStart, 
    oldWorkEnd, newWorkEnd,
    userAgent
} : { 
    oldWorkStart: number | null, newWorkStart: number | null, 
    oldWorkEnd: number | null, newWorkEnd: number | null,
    userAgent: string | null
} ) {

    try {

        /**
         * Ensure both old and new data are valid
         */
        if (oldWorkStart && !workStartSchema.safeParse(oldWorkStart).success) return { success: false, msg: "Invalid old start time", status: 400 }
        if (newWorkStart && !workEndSchema.safeParse(newWorkStart).success) return { success: false, msg: "Invalid start time", status: 400 }

        if (oldWorkEnd && !workStartSchema.safeParse(oldWorkEnd).success) return { success: false, msg: "Invalid old end time", status: 400 }
        if (oldWorkEnd && !workEndSchema.safeParse(oldWorkEnd).success) return { success: false, msg: "Invalid end time", status: 400 }

        if (userAgent && !userAgentSchema.safeParse(userAgent).success) return { success: false, msg: "Invalid user agent", status: 400 }

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
        if (user.startWork !== oldWorkStart) { 
            invalidateSession()
            return { success: false, msg: "User provided start time does not match database", status: 400 }
        }
        if (user.endWork !== oldWorkEnd) { 
            invalidateSession()
            return { success: false, msg: "User provided end time does not match database", status: 400 }
        }

        /**
         * Update start time
         */
        if (oldWorkStart !== newWorkStart && user.startWork !== newWorkStart) {

            /**
             * Update the database
             */
            const result = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    startWork: newWorkStart || null
                }
            })

            if (!result) throw new Error("Database internal error")

        }
        if (oldWorkEnd !== newWorkEnd && user.endWork !== newWorkEnd) {

            /**
             * Update the database
             */
            const result = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    endWork: newWorkEnd || null
                }
            })

            if (!result) throw new Error("Database internal error")
            
        }

        return { 
            success: true, 
            msg: "Work hours updated successfully",
            status: 200,
            data: {
                user: {
                    startWork: newWorkStart,
                    endWork: newWorkEnd
                }
            }
        };

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}