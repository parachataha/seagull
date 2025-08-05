import { type User, type Avatar } from "@/generated/prisma"

import { SessionWithToken } from "./Session"

export type SafeUser = Omit<User, "password"> & {
  avatar?: Avatar | null
}

export type PublicSafeUser = Omit<User, "password" | "email"> & {
  avatar?: Avatar | null
}

export type SafeSessionWithToken = Omit<SessionWithToken, "secretHash">