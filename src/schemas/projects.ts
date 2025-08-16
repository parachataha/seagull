import z from "zod"

export const timelineNameSchema = z
  .string()
  .min(1, { message: "Timeline name cannot be empty" })
  .max(100, { message: "Timeline name is too long" })
  .regex(/^[A-Za-z0-9\-._~ ]+$/, {
    message: "Timeline name can only contain English letters, digits, and - . _ ~ space",
  })

export const timelineDescriptionSchema = z
  .string()
  .min(1, { message: "Timeline description cannot be empty" })
  .max(500, { message: "Timeline description is too long" })
  .regex(/^[A-Za-z0-9\-._~ ]+$/, {
      message: "Timeline name can only contain English letters, digits, and - . _ ~ space",
    })