import z from "zod"

const idSchema = z.number().min(0)

const nameSchema = z.string().min(2).max(50)

const emailSchema = z.email().min(2).max(250)

const passwordSchema = z.string().min(6).max(200)

const userAgentSchema = z.string().min(0).max(300)

export { nameSchema, emailSchema, passwordSchema, userAgentSchema, idSchema }