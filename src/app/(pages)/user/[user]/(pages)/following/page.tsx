import getUser from "@/lib/user/getUser";
import { notFound } from "next/navigation";
import Link from "next/link";
import HorizontalUserWidget from "@/app/components/User/summaries/HorizontalUserWidget/HorizontalUserWidget";
import getUserFollowed from "@/lib/user/connections/getUserFollowed";
import { FaArrowLeft } from "react-icons/fa6";

// Styles
import styles from "./page.module.css"

// Types
import { User } from "@/types/auth";

interface Props {
    params: Promise<{ user: string }>
}

export default async function FollowingPage( {params} : Props ) {

    const slug = (await params).user;
    const result = await getUser(slug)
        if (!result || !result.success || !result.user) {
            notFound();
        }
    const user : User = result.user;
    
    const followedResult = await getUserFollowed(user.id)
    const followed = followedResult.data

    return( <div className={`wrapper ${styles.followersWrapper}`}>

        <div className="container items-start justify-start">
            <Link href={`/user/${user.slug}/`}> 
                <FaArrowLeft className={styles.backArrow}/> 
            </Link>

            <Link href={`/user/${user.slug}/`}>  
                <h5 className="grey capitalize mt-10 font-semibold"> {user.firstName}  {user.lastName}</h5> 
            </Link> 
            <h2 className={`capitalize ${styles.title}`}> Following </h2>

            {followed ? 
                <div> 
                    
                    {followed.length > 0 && <div> 
                        {followed.map((followed, index) => {
                            return <HorizontalUserWidget key={index} index={index} user={{
                                id: followed.followed_id,
                                firstName: followed.followed_first_name,
                                lastName: followed.followed_last_name,
                                slug: followed.followed_slug,
                                avatar: followed.followed_avatar,
                                avatar_url: followed.followed_avatar_url
                            }}/>
                        })}

                    </div>}

                </div>
            : 
                <p> 
                    This user is following no one
                </p>
            }
        </div>


    </div> )
}