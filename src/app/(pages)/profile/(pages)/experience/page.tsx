"use client"

import HorizontalAdd from "@/app/components/buttons/AddButtons/HorizontalAdd/HorizontalAdd"

// Redux
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux"

// Types
import { RootState } from "@/app/redux/store"
import Timeline from "@/app/components/User/Experience/Timeline/Timeline"
import AddExperience from "@/app/components/ui/Modals/AddExperience/AddExperience"
import NoExperience from "@/app/components/User/Experience/NoExperience/NoExperience"

export default function UserExperiencePage() {

    const router = useRouter()
    const user = useSelector((state: RootState) => state.user)

    // Show modals
    const [showAddExperience, setShowAddExperience] = useState<boolean>(false)
    
    return <div> 

        {showAddExperience && <AddExperience setShow={setShowAddExperience} />}
        
        {/* <header className='mb-2'>
            <h2> {user.experience?.length > 0 ? "Your Experience" : "You have no experience yet"}  </h2>
            {user.experience?.length <= 0 && <p className='grey'> With no experience, the experience tab will not show on your profile page </p>}
        </header>
        
        {user.experience?.length <= 0 && <HorizontalAdd onClick={() => router.push('/profile/experience/create')} className='w-full py-[20px_!important]'> Create Experience List </HorizontalAdd> } */}

        <h3 className='font-semibold'> Your Experience </h3>
        <p className="grey mb-2"> Share your experience with the world </p>
        {user.experience?.length > 0 ? 
            <Timeline experience={user.experience} /> 
        : 
            <NoExperience className="mt-4" />
        }
        

    </div>
}