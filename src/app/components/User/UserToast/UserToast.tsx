import { User } from "@/generated/prisma";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

interface UserProps extends Partial<Omit<User, 'createdAt' | 'password'>> {
    createdAt?: string | Date | null
}

interface PropTypes {
    user: UserProps
}

export default function UserToast({user} : PropTypes) {

    return ( <Link href={`/user/${user.username}`} className='flex gap-3 items-center'>
        
        <div className="relative">
            <Avatar customization={{ size: 40 }}/>
            <div className="bg-[#4AC569] rounded-full w-4 h-4 absolute bottom-[-3px] right-[-3px] border-2 border-background"></div>
        </div>

        <div>
            <p className="text-[16px] leading-5 font-semibold"> {user.firstName} {user.lastName} </p>
            <p className="text-grey"> {user.username} </p>
        </div>

    </Link> )
}