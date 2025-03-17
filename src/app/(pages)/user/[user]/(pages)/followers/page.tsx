import getUser from "@/lib/user/getUser";
import { notFound } from "next/navigation";

// Styles
import styles from "./page.module.css"

// Types
import { User } from "@/types/auth";
import getUserFollowers from "@/lib/user/connections/getUserFollowers";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import HorizontalUserWidget from "@/app/components/User/summaries/HorizontalUserWidget/HorizontalUserWidget";

interface Props {
    params: Promise<{ user: string }>
}

export default async function FollowersPage( {params} : Props ) {

    const slug = (await params).user;
    const result = await getUser(slug)
        if (!result || !result.success || !result.user) {
            notFound();
        }
    const user : User = result.user;
    
    const followersResult = await getUserFollowers(user.id)
    const followers = followersResult.data

    return( <div className={`wrapper ${styles.followersWrapper}`}>

        <div className="container items-start justify-start">
            <Link href={`/user/${user.slug}/`}> 
                <FaArrowLeft className={styles.backArrow}/> 
            </Link>

            <Link href={`/user/${user.slug}/`}>  
                <h5 className="grey capitalize mt-10 font-semibold"> {user.firstName}  {user.lastName}</h5> 
            </Link> 
            <h2 className={`capitalize ${styles.title}`}> Followers </h2>

            {followers ? 
                <div> 
                    
                    {followers.length > 0 && <div> 
                        
                        {followers.map((follower, index) => {
                            return <HorizontalUserWidget key={index} index={index} user={{
                                id: follower.follower_id,
                                firstName: follower.follower_first_name,
                                lastName: follower.follower_last_name,
                                slug: follower.follower_slug,
                                avatar: follower.follower_avatar,
                                avatar_url: follower.follower_avatar_url
                            }}/>
                        })}

                    </div>}

                </div>
            : 
                <p> 
                    This user has 0 followers
                </p>
            }
        </div>


    </div> )
}