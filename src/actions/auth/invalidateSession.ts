"use server"
import prisma from "@/lib/db";
import { ServerResponse } from "@/lib/types/ServerResponse";
import { tokenPartSchema, tokenSchema } from "@/schemas/session";
import { cookies } from "next/headers";

/**
 * Invalidate session (server-side). This function only removes DB session(s).
 * Do NOT mutate cookies here because this function is used during SSR/validation.
 */
export default async function invalidateSession(sessionId?: string) : Promise<ServerResponse<{ deleted: number }>> {
  "use server"
  // Only delete from DB (no cookie mutation)
  return await deleteServerSession(sessionId);
}

/**
 * Delete the client-side cookie. This is a Server Action and only deletes the cookie.
 * Call this from the client when you want the user's browser cookie removed.
 */
export async function deleteClientSession() {
  "use server"
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Delete sessions from the database only. Uses deleteMany to avoid throwing if missing.
 */
export async function deleteServerSession(sessionId?: string) : Promise<ServerResponse<{ deleted: number }>> {
  try {
    if (sessionId) {
      if (!tokenPartSchema.safeParse(sessionId).success) {
        return { success: false, msg: "Invalid sessionId", status: 400 };
      }
      const { count } = await prisma.session.deleteMany({
        where: { id: sessionId }
      });
      return { success: true, msg: "Deleted session from DB", status: 200, data: { deleted: count } };
    } else {
      const cookieStore = await cookies();
      const token = cookieStore.get("session")?.value;

      if (!tokenSchema.safeParse(token).success) {
        return { success: true, msg: "Invalid token", status: 400, data: { deleted: 0 } };
      }

      const sessionIdFromToken = token!.split(".")[0];

      const { count } = await prisma.session.deleteMany({
        where: { id: sessionIdFromToken }
      });

      return { success: true, msg: "Deleted session from DB", status: 200, data: { deleted: count } };
    }
  } catch (error) {
    return { success: false, msg: "Internal server error occurred when deleting database session", status: 500 };
  }
}
