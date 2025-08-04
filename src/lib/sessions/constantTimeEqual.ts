/**
 * Used to check if 2 sessions are identical, for example when validating 
 * if the client cookie's secret is the same as the database stored secret
 * 
 * @param a - Hashed secret
 * @param b - Hashed secret
 * @returns - Boolean
 */

export default function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
}
