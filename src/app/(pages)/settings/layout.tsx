import ProfileSidebar from "@/app/components/Navigation/ProfileSidebar"
import getCurrentSession from "@/app/redux/getCurrentSession"
import { redirect } from "next/navigation"

interface PropTypes {
    children?: React.ReactNode
}

export default async function ProfileLayout( {children} : PropTypes ) {

    const currentUser = await getCurrentSession()

    if (!currentUser.success || !currentUser.user) redirect("/login")
    
    const user = currentUser.user;

    return ( <div className='wrapper'>

        <div className='container page'>
            <div className="flex justify-between">
                <h1 className='text-2xl font-semibold'>Settings </h1>
                <div className="text-2xl text-grey"> Account Details <span className='text-white'> ({user.username}) </span> </div>
            </div>
            
            <div className="flex gap-6">
                <ProfileSidebar />
                
                <div className='py-4'>
                    {children}
                </div>
            </div> 


        </div>


    </div> )
}