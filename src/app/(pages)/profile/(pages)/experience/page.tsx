"use client"

import HorizontalAdd from "@/app/components/AddButtons/HorizontalAdd/HorizontalAdd"

// Redux
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux"

// Types
import { RootState } from "@/app/redux/store"

export default function UserExperiencePage() {

    const router = useRouter()
    const user = useSelector((state: RootState) => state.user)

    // Show modals
    const [showAddExperience, setShowAddExperience] = useState<boolean>(false)
    
    return <div> 
        
        <header className='mb-4'>
            <h2> {user.experience?.length > 0 ? "Your Experience" : "You have no experience yet"}  </h2>
            {user.experience?.length <= 0 && <p className='grey'> With no experience, the experience tab will not show on your profile page </p>}
        </header>
        
        {user.experience?.length <= 0 && <HorizontalAdd onClick={() => router.push('/profile/experience/create')} className='w-full py-[20px_!important]'> Add Experience </HorizontalAdd> }

    </div>
}