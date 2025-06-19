import { z } from "zod";

const emailSchema = z.string().trim().email();

export default function validateEmail(text: string): boolean {
    const result = emailSchema.safeParse(text);
    return result.success;
}
