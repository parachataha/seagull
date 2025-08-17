import z from "zod"

export const imageDescriptionSchema = z.string().min(1).max(300)

export const fileSchema = z.file()