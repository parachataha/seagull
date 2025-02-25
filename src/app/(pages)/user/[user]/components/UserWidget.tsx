import Tag from "@/app/components/Tags/Tag";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import followUser from "@/lib/auth/connections/followUser";
import FollowButton from "@/app/components/User/FollowButton/FollowButton";
import Avatar from "@/app/components/User/Avatar/Avatar";
import Link from "next/link";

interface Props {
    user: User
}

export default async function UserWidget( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");

    return ( 
        <div className={`widget rounded ${styles.userWidget}`}>

            <div className="flex justify-between items-end">
                
                <div className='flex items-center gap-3'>
                    <Avatar avatar={user.avatar} size={110}/>

                    <div>
                        <h1 className='capitalize text-[24px]'> {user.firstName} {user.lastName} </h1>
                        <div className="flex gap-3 font-medium ml-1">
                            <Link href={`/user/${user.slug}/following`} className="cursor-pointer hover:underline"> {user.followingCount} following </Link>
                            <Link href={`/user/${user.slug}/followers`} className="cursor-pointer hover:underline"> {user.followersCount} followers </Link>
                        </div>
                        {tagLabels.length > 1 && <div className='mt-[6px] flex gap-2'>
                            {tagLabels.map(tag => {
                                return <Tag key={tag.id}> {tag.value} </Tag>
                            })}
                        </div>}
                    </div>
                </div>

                <FollowButton followingId={user.id}/>

            </div>


        </div>
    )
}