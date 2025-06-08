import { User } from "@/generated/prisma";
import { Result } from "@/types/Result";

// 
import prisma from "@/api/utils/db";

interface getUserResult extends Result {
    user?: Omit<User, 'password' | 'email'>
}

export default async function getUser(username : string) : Promise<getUserResult> {

    try {

        if (!username || username.length < 3) return { success: false, msg: "Invalid username", status: 400 }

        const user = await prisma.user.findUnique({
            where: { 
                username: username
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                bio: true,
                label: true,
                createdAt: true,
            }
        })

        if (!user) {
            return {
                success: false,
                msg: "User not found",
                status: 404
            }
        }

        return {
            success: true,
            msg: "User found",
            status: 200,
            user: user
        }

    } catch(error) {

        return {
            success: false,
            msg: "An error occurred",
            status: 500
        }

    }

}