import bcrypt from "bcrypt"

export async function compareHash(text: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(text, hashed);
}
