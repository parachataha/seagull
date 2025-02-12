import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default async function SignupPage() {

    const { user } = await getCurrentSession();
    if (user !== null) {
        return redirect("/profile");
    }

    return <div className="wrapper">

        <div className="container">
            <h2> Welcome back. Login </h2> 

            <LoginForm/>

            <Link href="/signup">Don't have an account? Signup</Link>
        </div>

    </div>
}