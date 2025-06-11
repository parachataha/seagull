"use client"
// Types
import { RootState } from "@/app/redux/store"

// 
import Link from "next/link"
import { useSelector } from "react-redux"

interface PropTypes {
    children?: React.ReactNode
}

export default function ProfileSidebar() {

    const user = useSelector((state: RootState) => state.user)

    return ( <div className='my-5 min-h-[75vh] flex flex-col pr-9 border-r-2 border-r-secondary'>

        <div className='flex flex-col gap-4'>
            <ul className='flex flex-col gap-2'>
                <p className="text-grey mb-[-5px]"> Public </p>
                <li> <Link href='/profile/'> Account Details </Link> </li>
                <li> <Link href='/profile/'> Experience </Link> </li>
                <li> <Link href='/profile/'> Blogs and Docs </Link> </li>
            </ul>

            <ul className='flex flex-col gap-2'>
                <p className="text-grey mb-[-5px]"> Collaboration </p>
                <li> <Link href='/profile/'> Teams </Link> </li>
                <li> <Link href='/profile/'> Organizations </Link> </li>
                <li> <Link href='/profile/'> Communities </Link> </li>
            </ul>

            <ul className='flex flex-col gap-2'>
                <p className="text-grey mb-[-5px]"> Settings </p>
                <li> <Link href='/profile/'> Current Sessions </Link> </li>
                <li> <Link href='/profile/'> Danger Zone </Link> </li>
            </ul>

            <ul className='flex flex-col gap-2'>
                <p className="text-grey mb-[-5px]"> Support </p>
                <Link href='/profile/'> Support </Link>
                <Link href='/profile/'> Feedback </Link>
            </ul>
        </div>
        

    </div> )
}