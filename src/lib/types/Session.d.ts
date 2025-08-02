/**
 * @interface Session - Data stored in database and used on serverside
 * @interface SessionWithToken - Token is only sent to client size
 */

export interface Session {
    id: string;
    secretHash: Uint8Array; // Uint8Array is a byte array
    createdAt: Date;
}

export interface SessionWithToken extends Session {
	token: string;
}

