import { type User, type Avatar, UserSkill } from "@prisma/client"

import { SessionWithToken } from "./Session"

export type SafeUser = Omit<User, "password"> & {
  avatar?: Avatar | null,
  Skills: UserSkill[]
}

export type PublicSafeUser = Omit<User, "password" | "email"> & {
  avatar?: Avatar | null,
  Skills: UserSkill[]
}

export type SafeSessionWithToken = Omit<SessionWithToken, "secretHash"> 