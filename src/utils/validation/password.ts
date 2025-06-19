import { z } from "zod";

const passwordSchema = z.string().trim().min(5).max(100);

export default function validatePassword(text: string): boolean {
    
    const result = passwordSchema.safeParse(text);
    return result.success;

}
