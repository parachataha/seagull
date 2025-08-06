import z from "zod"

const idSchema = z.number().min(0)

/** Schemas used for credentials */
const emailSchema = z.email().min(2).max(250)
const passwordSchema = z.string().min(6).max(200)

const userAgentSchema = z
    .string()
    .min(10, { message: "User agent is too short" })
    .max(512, { message: "User agent is too long" })
    .regex(/^[\x20-\x7E]+$/, {
        message: "User agent contains invalid characters",
    })

/**
 * User basic information
 */
const nameSchema = z.string().min(2).max(50)
const labelSchema = z.string().max(250)
const aboutSchema = z.string().max(1000)
const slugSchema = z
  .string()
  .min(1, { message: "Cannot be empty" })
  .max(250, { message: "Too long" })
  .regex(/^[A-Za-z0-9\-._~]+$/, {
    message:
      "Only English letters, digits, and - . _ ~ are allowed",
})

/**
 * User extra information
 * (location, timezone and work hours)
 */
const locationSchema = z.string().max(250).optional()
const timezoneSchema = z.string().max(5).optional()
const workStartSchema = z.number().min(0).max(24)
const workEndSchema = z.number().min(0).max(24)

export { 
  idSchema,
  nameSchema, labelSchema, slugSchema, aboutSchema,
  emailSchema, passwordSchema, 
  userAgentSchema,
  // User extra information
  locationSchema, timezoneSchema, workStartSchema, workEndSchema
}