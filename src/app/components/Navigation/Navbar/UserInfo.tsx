"use client"
// Types
import { RootState } from "@/app/redux/store"

// 
import { useSelector } from "react-redux"
import UserToast from "../../User/UserToast/UserToast"
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

export default function UserInfo() {

    const user = useSelector((state: RootState) => state.user)

    return ( <div className='flex justify-between items-center'>

        <UserToast user={user}/>

        <Link href='/'> <FaAngleDown className='ml-9 text-xl' /> </Link>
        
    </div>  )

}