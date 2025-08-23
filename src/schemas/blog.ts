import z from "zod"

export const blogTitleSchema = z.string().min(5).max(250)

export const blogDescriptionSchema = z.string().min(5).max(500)

export const blogSlugSchema = z
    .string()
    .min(1, { message: "Cannot be empty" })
    .max(250, { message: "Too long" })
    .regex(/^[A-Za-z0-9\-._~]+$/, {
    message:
        "Only English letters, digits, and - . _ ~ are allowed",
})

export const bodySchema = z.object({
    type: z.literal("doc"),
    content: z.array(z.any()),
})