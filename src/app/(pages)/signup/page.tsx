import Image from "next/image";
import { SignupForm } from "./SignupForm";
import { cookies } from "next/headers";
import getCurrentSession from "@/app/redux/getCurrentSession";
import { redirect } from "next/navigation";

export default async function SignupPage() {

    const currentUser = await getCurrentSession()
    if (currentUser.success) {
        redirect("/profile")
    }

    return ( <div className=''>

        <div className="grid grid-cols-2 min-h-[100vh] items-center">

            <div className="py-10 px-5 flex flex-col max-w-[500px] m-auto">
                <h1 className="text-3xl font-bold pt-4 pb-4">Welcome to Seagull</h1>
                <SignupForm/>
            </div>

            <Image src="/images/vectors/purple-art-1.jpg" alt='design' width={700} height={500} className="w-full h-full object-cover"/>

        </div>

    </div> )
}

