import { type User, type Avatar, UserSkill, Project, Timeline } from "@prisma/client"

import { SessionWithToken } from "./Session"
import { BlogWithDocsBasic } from "./Blog"

export type SafeUser = Omit<User, "password"> & {
  avatar?: Avatar | null,
  skills?: UserSkill[],
  projects?: Project[],
  timelines?: Timeline[],
  blogs?: BlogWithDocsBasic[]
}

export type PublicSafeUser = Omit<User, "password" | "email"> & {
  avatar?: Avatar | null,
  skills?: UserSkill[],
  projects?: Project[],
  timelines?: Timeline[],
  blogs?: BlogWithDocsBasic[]
}

export type SafeSessionWithToken = Omit<SessionWithToken, "secretHash"> 