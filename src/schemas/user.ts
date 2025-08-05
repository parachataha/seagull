import z from "zod"

const idSchema = z.number().min(0)

const nameSchema = z.string().min(2).max(50)

const slugSchema = z
  .string()
  .min(1, { message: "Cannot be empty" })
  .max(250, { message: "Too long" })
  .regex(/^[A-Za-z0-9\-._~]+$/, {
    message:
      "Only English letters, digits, and - . _ ~ are allowed",
  })

const emailSchema = z.email().min(2).max(250)

const passwordSchema = z.string().min(6).max(200)

const userAgentSchema = z
    .string()
    .min(10, { message: "User agent is too short" })
    .max(512, { message: "User agent is too long" })
    .regex(/^[\x20-\x7E]+$/, {
        message: "User agent contains invalid characters",
    })

export { nameSchema, slugSchema, emailSchema, passwordSchema, userAgentSchema, idSchema }