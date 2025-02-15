import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import Container from "./Container";

// Types
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "My Account - Seagull",
    description: "Login or signup to Seagull to create your creator portfolio. Upload past projects and get advertise yourself to new clients."
}

export default async function UserPage() {

    const cookieStore = await cookies();

    const token = cookieStore.get("session")

    if (!token) {
        redirect("/login?redirect=profile")
    }

    return ( <>

        <Container/>

    </>)
}