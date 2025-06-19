"use client"

import { RootState } from "@/app/redux/store"
import { useSelector } from "react-redux"

export default function UserWidget() {

    const user = useSelector((state: RootState) => state.user)

    if (user.email !== "") { return ( 
        <div className='border-l-2 border-l-secondary px-2'>
            
            

        </div> 
    ) } else return (
        <div className='border-l-2 border-l-secondary px-2'>
            Login

            Signup
        </div> 
    )
}