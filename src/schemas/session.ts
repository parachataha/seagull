import z from 'zod'

const tokenSchema = z
    .string()
    .regex(/^[a-km-z2-9]{24}\.[a-km-z2-9]{24}$/, {
        message: "Must be two session ids separated by a dot",
    })
    .transform((val) => {
        const [first, second] = val.split(".")
        return {
        first: tokenPartSchema.parse(first),
        second: tokenPartSchema.parse(second),
        raw: val,
        } as const
})

const tokenPartSchema = z
    .string()
    .length(24, { message: "Session id must be 24 characters" })
    .regex(/^[a-km-z2-9]+$/, {
        message: "Session id contains invalid characters",
})

export { tokenSchema }