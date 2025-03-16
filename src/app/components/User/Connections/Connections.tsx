import Link from "next/link";

// Types
import { User } from "@/types/auth";

interface Props {
    user: User
}

export default function Connections({user} : Props) {
    
    return ( 
        <div className="flex gap-3 font-medium">
            <Link href={`/user/${user.slug}/following`} className="cursor-pointer hover:underline"> 
                {user.followingCount} following 
            </Link>

            <Link href={`/user/${user.slug}/followers`} className="cursor-pointer hover:underline"> 
                {user.followersCount} follower
                {user.followersCount !== 1 ? "s" : ""} 
            </Link>
        </div>    
    )
}