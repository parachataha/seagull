import { z } from "zod";

const nameSchema = z.string().trim().min(3).max(50);

export default function validateName(text: string): boolean {
    
    const result = nameSchema.safeParse(text);
    return result.success;

}
