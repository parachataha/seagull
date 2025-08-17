"use server"

import { aboutSchema } from "@/schemas/user"

// Lib
import prisma from "@/lib/db"

// Server actions
import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"
import { ServerResponse } from "@/lib/types/ServerResponse"
import { PublicSafeUser } from "@/lib/types/User"

type UserResult = { user: { about: string | null} }

/**
 * First validates the user cookie, and updates the authenticated user's label
 */
export default async function updateAbout( { oldAbout, newAbout, userAgent } : { oldAbout: string | null, newAbout: string | null, userAgent: string | null } ) : Promise<ServerResponse<UserResult>> {

    try {

        /**
         * Ensure both old and new labels are valid data
         */
        if (oldAbout?.trim() && !aboutSchema.safeParse(oldAbout).success) return { success: false, msg: "Invalid old about", status: 400 }
        if (newAbout?.trim() &&!aboutSchema.safeParse(newAbout.trim()).success) return { success: false, msg: "Invalid about", status: 400 }

        /**
         * Return if no changes made
         */
        if (oldAbout?.trim() === newAbout?.trim()) return { success: true, msg: "Not modified", status: 304, data: { user: { about: newAbout?.trim() || null } } }

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
        if (user.about?.trim() === newAbout?.trim()) return { success: true, msg: "Not modified", status: 304, data: { user: { about: newAbout?.trim() || null } } }
        if (user.about && user.about?.trim() !== oldAbout?.trim()) { 
            invalidateSession()
            return { success: false, msg: "User provided about does not match database", status: 400 }
        }

        /**
         * Update the database
         */
        const result = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                about: newAbout?.trim() || null
            }
        })

        if (!result) throw new Error("Database internal error")

        return { 
            success: true, 
            msg: "About updated successfully",
            status: 200,
            data: {
                user: {
                    about: newAbout?.trim() || null
                }
            }
        };

    } catch (error : any) {

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}