import Image from "next/image";
import { SignupForm } from "./SignupForm";

export default function SignupPage() {

    return ( <div className=''>

        <div className="grid grid-cols-2 min-h-[100vh]">

            <div className="py-10 px-5 flex flex-col max-w-[500px] m-auto">
                <h1 className="text-3xl font-bold pt-4 pb-4">Welcome to Seagull</h1>
                <SignupForm/>
            </div>

            <Image src="/images/vectors/purple-art-1.jpg" alt='design' width={700} height={500} className="w-full h-full object-cover"/>

        </div>

    </div> )
}

