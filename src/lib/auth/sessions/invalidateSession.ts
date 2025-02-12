"use server"
import { query } from "@/lib/database";

export async function invalidateSession(sessionId: string) : Promise<void> {
    await query("DELETE FROM user_sessions WHERE ID = $1", [sessionId])
}