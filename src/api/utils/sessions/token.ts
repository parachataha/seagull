import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

// Create session token
export function createSessionToken() : string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token
}
