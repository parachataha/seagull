import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/cookies/getCurrentSession";
import SignupForm from "./SignupForm";
import Link from "next/link";

export default async function SignupPage() {

    const { user } = await getCurrentSession();
    if (user !== null) {
        return redirect("/");
    }

    return <div className="wrapper">

        <div className="container">
            <h2> Welcome to Seagull, Signup </h2> 

            <SignupForm/>

            <Link href="/login">Already have an account? Login</Link>
        </div>

    </div>
}