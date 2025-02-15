import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import Container from "./Container";

export default async function SettingsPage() {

    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) { 
        return redirect("/login")
    }

    return ( <div className='wrapper py-3'>

        <Container />

    </div> )
}