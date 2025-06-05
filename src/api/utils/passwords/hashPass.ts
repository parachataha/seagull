import argon2 from "argon2";

export default async function hashPass(password : string) {
 
    try {

        return await argon2.hash(password);


    } catch (error) {

        return null

    }
    
}