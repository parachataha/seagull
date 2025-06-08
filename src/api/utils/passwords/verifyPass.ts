import { Result } from "@/types/Result";

// 
import argon2 from "argon2";

export default async function verifyPass(hash : string, password : string) : Promise<Result> {
 
    try {

        if (await argon2.verify(hash, password)) {
            return { success: true, status: 200, msg: "Correct password" }
        } else {
            return { success: false, status: 401, msg: "Incorrect password" }
        }

    } catch (error) {

        return { success: false, status: 500, msg: "Could not verify password" }

    }
    
}