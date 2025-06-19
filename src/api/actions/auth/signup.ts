"use server"

import prisma from "@/api/lib/db";
import hashPass from "@/api/lib/passwords/hashPass";
import createSession from "../sessions/createSession";

// Types
import { User } from "@/generated/prisma";
import { Result } from "@/types/Result";
import { SessionWithToken } from "@/types/Session";
import { z } from "zod/v4";

interface DataType {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userAgent: string,
}

interface SignupResult extends Result {
    user?: Partial<User>,
    session?: Omit<SessionWithToken, 'secretHash'>
}

const dataSchema = z.object({
    firstName: z.string().trim().min(3).max(50),
    lastName: z.string().trim().min(3).max(50),
    email: z.string().trim().email(),
    password: z.string().trim().min(5).max(100),
    userAgent: z.string().trim().max(200)
})

export default async function signup(data : DataType) : Promise<SignupResult> {

    try {
        
        if (!dataSchema.safeParse(data).success) return { success: false, msg: "Invalid data", status: 401 }

        const hashedPassword = await hashPass(data.password.trim())
        if (typeof hashedPassword !== "string") return { success: false, msg: "A server error occurred hashing your password", status: 500 }

        const username = `${data.email.trim().split("@")[0]}${Math.floor(Math.random() * 90) + 10}`.replaceAll(" ", "")

        const result = await prisma.user.create({
            data: {
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim(),
                username: username,
                password: hashedPassword,
            }
        })

        const sessionResult = await createSession(result.id, data.userAgent)

        if (!sessionResult.success || !sessionResult.session) return {
            success: false,
            msg: sessionResult.msg,
            status: sessionResult.status
        }

        const session = sessionResult.session
        
        return { 
            success: true,
            msg: "User created successfully",
            status: 200,
            user: { ...result, password: undefined },
            session: { id: session.id, token: session.token, createdAt: session.createdAt }
        }

    } catch (error : any) {

          if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            return { success: false, msg: "A user already exists with that email", status: 400 }
        }

        return { success: false, msg: "An unexpected error occurred", status: 500 }
        
    }

} 