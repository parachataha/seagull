"use server"
// Types
import { Result } from "@/types/Result";
import { User } from "@/generated/prisma/client"

import prisma from "../utils/db";
import hashPass from "../utils/passwords/hashPass";
import { Prisma } from "@prisma/client";

interface Props {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

interface CreateUserResult extends Result {
    data?: User
}

export default async function createUser( data : Props ) : Promise<CreateUserResult> {

    if (!data) return { success: false, msg: "Please enter valid data", status: 400 }
    if (data.first_name.trim().length < 2) return { success: false, msg: "Please enter valid first name", status: 400 }
    if (data.last_name.trim().length < 2) return { success: false, msg: "Please enter valid last name", status: 400 }
    if (data.email.trim().length < 5 || !data.email.trim().includes("@") || !data.email.trim().includes(".")) return { success: false, msg: "Please enter valid email", status: 400 }
    if (data.password.trim().length < 6) return { success: false, msg: "Please enter a stronger password", status: 400 }


    try {

        const hashedPassword = await hashPass(data.password.trim());
        if (!hashedPassword) return { success: false, msg: "An error occurred hashing your password", status: 500 }

        const result = await prisma.user.create({

            data: {
                first_name: data.first_name.trim(),
                last_name: data.last_name.trim(),
                email: data.email.trim().toLowerCase(),
                password: hashedPassword,
                username: `${data.email.split("@")[0]}${Math.floor(Math.random() * 10000)}`
            }, 

        })

        if (!result) return { success: false, msg: "An error occurred when creating user", status: 500 }

        return {
            success: true, 
            msg: "User created successfully",
            status: 200,
            data: {
                ...result
            }
        }

    } catch (error : any) {

        if (error.code === "P2002") return { 
            success: false, 
            msg: "Email already taken, login instead",
            status: 409
        }

        return { success: false, msg: "An error occurred", status: 500 }

    }

} 