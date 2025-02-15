"use server"

import { getCurrentSession } from "./cookies/getCurrentSession"

interface Result {
    success: boolean, 
    msg: string,
    status: number
}

export default async function followUser(id : number) : Promise<Result> {

    // AUTHENTICATE USER
    const currentUser = getCurrentSession()

    try {

        return { success: false, status: 404, msg: "" }

    } catch (error) {

        return { success: false, status: 404, msg: "" }

    }

}  