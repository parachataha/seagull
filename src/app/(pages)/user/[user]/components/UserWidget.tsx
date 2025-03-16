import Tag from "@/app/components/Tags/Tag";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import FollowButton from "@/app/components/User/FollowButton/FollowButton";
import Avatar from "@/app/components/User/Avatar/Avatar";
import Tags from "@/app/components/Tags/Tags";
import Connections from "@/app/components/User/Connections/Connections";

interface Props {
    user: User
}

export default async function UserWidget( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");

    return ( 
        <div className={`widget rounded ${styles.userWidget}`}>

            <div className="flex justify-between items-end">
                
                <div className='flex items-center gap-3'>
                    <Avatar avatar_url={user.avatar_url} avatar={user.avatar} size={110}/>

                    <div>
                        <h1 className='capitalize text-[24px]'> {user.firstName} {user.lastName} </h1>
                        <Connections user={user}/>
                        <Tags tags={tagLabels}/>
                    </div>
                </div>

                <FollowButton followingId={user.id}/>

            </div>


        </div>
    )
}