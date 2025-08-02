import argon2 from "argon2";

export default async function hashPass(password : string) : Promise<string | null> {
 
    try {

        return await argon2.hash(password);

    } catch (error) {

        return null

    }
    
}