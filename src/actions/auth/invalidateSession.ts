import { cookies } from "next/headers";


export async function deleteClientSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session")
}