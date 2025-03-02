import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";
import { notFound } from "next/navigation";
import Sidebar from "./components/Sidebar";
import getUser from "@/lib/user/getUser";

// Types
import { User } from "@/types/auth";
import Link from "next/link";

type Props = {
    params: Promise<{ user: string, page?: string }>,
}

export default async function UserExperiencePage( {params} : Props ) {
    
    const currentUser = (await getCurrentSession()).user
    const slug = (await params).user;

    const result = await getUser(slug)
    if (!result || !result.success || !result.user) {
        notFound();
    }
    const user : User = result.user;

    return <div className='container grid grid-cols-[25%_75%]'> 

        <Sidebar user={user}/>

        <div className='pl-4'>

            {currentUser?.slug === user.slug && <Link href='/profile/experience' className='block widget yellow text-center justify-center'> 

                <p className='text-primary-yellow'> Edit Experience </p>
                
            </Link>}

        </div>
        
    </div>
}