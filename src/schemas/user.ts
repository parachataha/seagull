import z from "zod"

const idSchema = z.number().min(0)

const nameSchema = z.string().min(2).max(50)

const emailSchema = z.email().min(2).max(250)

const passwordSchema = z.string().min(6).max(200)

const userAgentSchema = z
    .string()
    .min(10, { message: "User agent is too short" })
    .max(512, { message: "User agent is too long" })
    .regex(/^[\x20-\x7E]+$/, {
        message: "User agent contains invalid characters",
    })
s
export { nameSchema, emailSchema, passwordSchema, userAgentSchema, idSchema }