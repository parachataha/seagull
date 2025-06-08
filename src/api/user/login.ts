"use server"
// Types
import { User } from "@/generated/prisma";
import { Result } from "@/types/Result";

// 
import verifyPass from "../utils/passwords/verifyPass";
import prisma from "../utils/db";
import { createSessionToken } from "../utils/sessions/token";
import createSession from "../utils/sessions/createSession";

interface Props {
    email: string,
    password: string,
    userAgent: string
}

interface LoginResult extends Result {
    user?: Omit<User, "password">
}

export default async function login(data : Props) : Promise<LoginResult> {

    try {

        if (data.email.trim().length < 5 || !data.email.trim().includes("@") || !data.email.trim().includes(".")) return { success: false, msg: "Please enter valid email", status: 400 }
        if (data.password.trim().length < 6) return { success: false, msg: "Please enter a stronger password", status: 400 }

        const password = await prisma.user.findUnique({
            where: { email: data.email.trim().toLowerCase() },
            select: { password: true }
        })

        if (!password) return { success: false, msg: "Email does not exist, sign up instead", status: 403 }

        const verifyPasswordResult = await verifyPass(password.password, data.password)

        if (!verifyPasswordResult.success) return { success: false, msg: verifyPasswordResult.msg, status: verifyPasswordResult.status }

        const user = await prisma.user.findUnique({
            where: { email: data.email.trim().toLowerCase() },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                bio: true,
                label: true,
                createdAt: true,
                password: false
            }
        })

        if (!user) return { success: false, msg: "Email does not exist, sign up instead (x2)", status: 403 }

        const newSessionToken = createSessionToken();
        const newSession = await createSession(newSessionToken, user.id, data.userAgent);

        if (!newSession) return { success: false, msg: "An error occurred when creating user session", status: 500 }

        return { success: true, msg: "Welcome back!", status: 200, user: user }

    } catch (error) {

        return { 
            success: false, 
            msg: "An error occurred", 
            status: 500 
        }

    }

}