"use server"

import { z } from "zod";
import { cookies } from "next/headers";

import hashSecret from "@/api/lib/sessions/hashSecret";
import getSession from "./getSession";

import { Result } from "@/types/Result";
import { Session } from "@/types/Session";
import { User } from "@/generated/prisma";

const tokenSchema = z.string().trim()

interface ValidateResult extends Result {
    session?: Session,
    user?: Partial<User>
}

export default async function validate(token : string) : Promise<ValidateResult> {

    try {

        const cookieStore = await cookies()
    
        if (!tokenSchema.safeParse(token).success) { 
            cookieStore.delete("session")
            return { success: false, msg: "Invalid token", status: 401 } 
        }
        
        const tokenParts = token.split('.')
        if (tokenParts.length !== 2) { 
            return { success: false, msg: "Invalid token", status: 401 } 
        }
        
        const sessionId = tokenParts[0];
        const sessionSecret = tokenParts[1];
    
        const sessionResult = await getSession(sessionId);
        if (!sessionResult.success || !sessionResult.session || !sessionResult.user) { 
            return { success: false, msg: sessionResult.msg, status: sessionResult.status  }
        }
    
        const session = sessionResult.session
        const user = sessionResult.user
    
        const tokenSecretHash = await hashSecret(sessionSecret);
        const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
    
        if (!validSecret) {
            return { success: false, msg: "Invalid session secret", status: 401 };
        }
        
        return { 
            success: true, 
            msg: "Valid session", 
            status: 200, 
            session: session,
            user: user 
        };

    } catch (error) {

        return { success: false, msg: "An unexpected error occurred", status: 500 };

    }

}   

// I think this compares binary stuff
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
}
