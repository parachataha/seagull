"use server"

import { Result } from "@/types/Result";
import { SessionWithToken } from "@/types/Session";

import prisma from "@/api/lib/db";
import { cookies } from "next/headers";
import generateSessionToken from "@/api/lib/sessions/generateSessionToken";
import hashSecret from "@/api/lib/sessions/hashSecret";

interface CreateSessionResult extends Result {
	session?: SessionWithToken
}

export default async function createSession(userId: number, userAgent : string) : Promise<CreateSessionResult> {

    const now = new Date();
	const cookieStore = await cookies()

	const id = await generateSessionToken();
	const secret = await generateSessionToken();
	const secretHash = await hashSecret(secret);

	const token = id + "." + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		token
	};

	cookieStore.set("session", session.token, {
		path: "/",
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30
	});


    const result = await prisma.session.create({
        data: {
            id: session.id,
            secretHash: session.secretHash,
            userId: userId,
            userAgent: userAgent,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
    })

	return { success: true, msg: "Session created", status: 200, session: session};

}