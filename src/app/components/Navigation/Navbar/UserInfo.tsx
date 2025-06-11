"use client"
// Types
import { RootState } from "@/app/redux/store"

// 
import { useSelector } from "react-redux"
import UserToast from "../../User/UserToast/UserToast"
import { FaAngleDown, FaGear } from "react-icons/fa6";
import Link from "next/link";

export default function UserInfo() {

    const user = useSelector((state: RootState) => state.user)

    return ( <div className='flex justify-between items-center'>

        {user.email !== "" ? <>
            <UserToast user={user}/>

            <Link href='/settings'> <FaGear className='ml-9 text-xl' /> </Link>
        </> : <div className='flex items-center gap-1'>
            <Link href='/' className='p-1 bg-secondary rounded-sm text-[16px]'> Login </Link>
            <Link href='/' className='p-1 bg-tertiary rounded-sm text-[16px]'> Sign up </Link>
        </div>}
        
    </div>  )

}