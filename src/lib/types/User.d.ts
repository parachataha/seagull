import { User } from "@/generated/prisma"
import { SessionWithToken } from "./Session"

type SafeUser = Omit<User, "password">
type SafeSession = Omit<SessionWithToken, "secretHash">