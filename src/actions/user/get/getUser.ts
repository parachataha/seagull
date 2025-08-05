"use server"
// Types & schemas
import { PublicSafeUser } from "@/lib/types/User";

import { ServerResponse } from "@/lib/types/ServerResponse";
import { slugSchema, userAgentSchema } from "@/schemas/user";
import validateSession from "@/actions/auth/validateSession";
import prisma from "@/lib/db";

export default async function getUser({slug, userAgent} : { slug: string, userAgent: string | null }) : Promise<ServerResponse<PublicSafeUser>> {

    try {

        /**
         * Validate the slug and userAgent if any
         */
        if (!slugSchema.safeParse(slug.trim().toLowerCase().replaceAll(" ", "")).success) return { success: false, msg: "Invalid slug", status: 404 };
        if (userAgent && !userAgentSchema.safeParse(userAgent).success) return { success: false, msg: "Invalid user agent", status: 400 };

        /**
         * Fetch user
         */
        const user = await prisma.user.findUnique({
            where: {
                slug: slug.trim().toLowerCase().replaceAll(" ", "")
            },
            select: {
                id: true,
                name: true,
                about: true, 
                label: true,
                avatarId: true,
                slug: true,
                createdAt: true,
                updatedAt: true,

                location: true,
                timezone: true,
                startWork: true,
                endWork: true,

                avatar: {
                    select: {
                        id: true,
                        url: true,
                        name: true,
                    }
                }
            }
        })

        if (!user) return { success: false, msg: "No user found", status: 404 }
        
        console.log(user)

        return {
            success: true,
            msg: "User found",
            status: 200,
            data: {
                ...user
            }
        }
        

    } catch (error : any) {

        console.log(error)
        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }

}