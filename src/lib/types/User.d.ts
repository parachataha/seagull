import { type User, type Avatar, UserSkill, Project, Timeline } from "@prisma/client"

import { SessionWithToken } from "./Session"

export type SafeUser = Omit<User, "password"> & {
  avatar?: Avatar | null,
  skills?: UserSkill[],
  projects?: Project[],
  timelines?: Timeline[],
}

export type PublicSafeUser = Omit<User, "password" | "email"> & {
  avatar?: Avatar | null,
  skills?: UserSkill[],
  projects?: Project[],
  timelines?: Timeline[],
}

export type SafeSessionWithToken = Omit<SessionWithToken, "secretHash"> 