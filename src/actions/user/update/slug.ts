"use server"

import invalidateSession from "@/actions/auth/invalidateSession"
import validateSession from "@/actions/auth/validateSession"
import prisma from "@/lib/db"
import { ServerResponse } from "@/lib/types/ServerResponse"
import { slugSchema } from "@/schemas/user"

/**
 * First validates the user cookie, and updates the authenticated user's slug
 */
export default async function updateSlug( { 
    oldSlug, 
    newSlug, 
    userAgent 
} : { 
    oldSlug: string | null, 
    newSlug: string, 
    userAgent: string | null 
} ) : Promise<ServerResponse<{ user: { slug: string } }>> {

    try {

        /**
         * Ensure both old and new slugs are valid data
         */
        if (oldSlug && !slugSchema.safeParse(oldSlug).success) return { success: false, msg: "Invalid old slug", status: 400 }
        if (!slugSchema.safeParse(newSlug).success) return { success: false, msg: "Invalid slug", status: 400 }

        /**
         * Return if no changes made
         */
        if (oldSlug?.trim().toLowerCase() === newSlug.trim().toLowerCase()) return { success: true, msg: "Not modified", status: 304, data: { user: { slug: newSlug.trim().toLowerCase() } } }

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
        if (user.slug?.trim().toLowerCase() === newSlug.trim().toLowerCase()) return { success: true, msg: "Not modified", status: 304, data: { user: { slug: newSlug.trim().toLowerCase().replaceAll("", "-") } } }
        if (user.slug && user.slug?.trim().toLowerCase() !== oldSlug?.trim().toLowerCase()) { 
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
                slug: newSlug.trim().toLowerCase()
            }
        })

        if (!result) throw new Error("Database internal error")

        return { 
            success: true, 
            msg: "Slug updated successfully",
            status: 200,
            data: {
                user: {
                    slug: newSlug.trim().toLowerCase()
                }
            }
        };

    } catch (error : any) {

        /**
         * Slug taken already
         */
         if (error.code === "P2002") return { 
            success: false, 
            msg: `Slug is taken already`,
            status: 409,
        }

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}