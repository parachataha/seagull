"use client"

// Types
import { User } from "@/types/auth"

interface Props { 
    styles: any,
    setError: any,
    error: { isError: boolean, msg: string },
    user: User
}

export default function NextStepsWidget(  {styles, setError, error, user} : Props  ) {

    return ( <div>

        

    </div> )
}