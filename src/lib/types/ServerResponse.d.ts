
/**
 * All server actions returns a Promise of @type ServerResponse. (Although may extend the type to include user/other data)
 * To customize the @type `data`, use the prop T. 
 * @example SuccessResponse<{user: User, session: Session}>
 */

import { Session, User } from "@prisma/client"
import { PublicSafeUser, SafeSessionWithToken, SafeUser } from "./User"

type SuccessResponse<T = undefined> = {
  success: true
  msg: string
  status: number
  data: T
}

type ErrorResponse = {
  success: false
  msg: string
  status: number
}

export type ServerResponse<T = undefined> = SuccessResponse<T> | ErrorResponse

/**
 *  EXAMPLE
 *  export interface CustomServerResponse extends ServerResponse {
 *     user?: { ... }
 *  }
 */