import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/cookies/getCurrentSession";
import LoginForm from "./LoginForm";

export default async function SignupPage() {

    const { user } = await getCurrentSession();
    if (user !== null) {
        return redirect("/");
    }

    return <div className="wrapper">

        <div className="container">
            <h2> Welcome back. Login </h2> 

            <LoginForm/>
        </div>

    </div>
}