"use server"

// Server actions & lib
import prisma from "@/lib/db";
import validateSession from "../auth/validateSession";

// Schemas
import { timelineDescriptionSchema, timelineNameSchema } from "@/schemas/projects";
import { userAgentSchema } from "@/schemas/user";

// Types
import { ServerResponse } from "@/lib/types/ServerResponse";
import { PublicSafeUser, SafeUser } from "@/lib/types/User";

export default async function createUserTimeline({
    name, 
    description,
    userAgent
} : {
    name: string,
    description?: string,
    userAgent: string
}) : Promise<ServerResponse<PublicSafeUser>> {

    try {

        /**
         * Validate user inputs
         */
        const nameTest = timelineNameSchema.safeParse(name)
        const descriptionTest = timelineDescriptionSchema.safeParse(name)
        const userAgentTest = userAgentSchema.safeParse(userAgent)

        if (!nameTest.success) {
            return { success: false, msg: nameTest.error.message, status: 400 };
        } 
        if (description && !descriptionTest.success) {
            return { success: false, msg: descriptionTest.error.message, status: 400 };
        } 
        if (userAgent && !userAgentTest.success) {
            return { success: false, msg: descriptionTest.error?.message, status: 400 };
        } 

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
        
        const user : SafeUser = sessionResult.data.user

        /**
         * Create timeline
         */

        const result = await prisma.timeline.create({
            data: {
                name: name.trim(),
                description: description?.trim() || null,
                userId: user.id,
                createdAt: Math.floor(new Date().getTime() / 1000),
            }
        })

        if (!result) throw new Error("Database internal error occurred while creating timeline");
        
        return {
            success: true,
            msg: "Timeline created successfully",
            data: {
                user: { 
                    timelines: [...user.timelines, result]
                }
            },
            status: 201,
        }

    } catch (error : any) {
        
        if (error.code === "P2002" &&
            error.meta?.target?.includes("userId_name")
        ) return { 
            success: false, 
            msg: "You already have a timeline with this name",
            status: 409,
        }

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }


    }

}