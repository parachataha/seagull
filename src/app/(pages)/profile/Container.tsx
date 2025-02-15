"use client"

import { usePathname, useRouter } from "next/navigation"
import Tag from "@/app/components/Tags/Tag";

// Redux
import { useSelector } from "react-redux"

// Types
import { RootState } from "@/app/redux/store";
import { useEffect } from "react";

// Styles
import styles from "./profile.module.css";
import Link from "next/link";

export default function Container() {

    const router = useRouter()
    const pathname = usePathname()
    const user = useSelector((state: RootState) => state.user);

    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");  

    return ( <div className='wrapper'>

        <header className={`container ${styles.header}`}>

        <div className='flex justify-between'>
            <div className="left">
                <h4 className={styles.user}>Creator</h4>
                <h1 className='capitalize'>{user.firstName} <br/> {user.lastName}</h1>

                {/* LABEL TAGS */}
                {user.tags?.length == 0 ? 
                    <div className={styles.newHereLabel}> Hey, I'm new here! </div>
                :
                    <div className='mt-1 flex flex-wrap gap-2'>
                        {user.tags.map((tag) => {
                            if (tag?.type === "label") return <Tag key={tag.id}> {tag.value} </Tag>
                        })}
                    </div>
                }

            </div>

            <div className="right">

                {/* CONNECTIONS */}
                <div className="flex">
                    <Link href={`/user/${user.slug}/followers`} className="hover:underline font-medium mr-2"> {user.followersCount} followers </Link>
                    <Link href={`/user/${user.slug}/following`} className="hover:underline font-medium"> {user.followingCount} following</Link>
                </div>

                {/* TAGS WIDGET */}
                {(tagServices.length > 0 || tagSkills.length > 0) && <div className="widget mt-3">

                    {tagServices.length > 0 && 
                    <div>
                        <h3>Services</h3>
                        <div className="flex flex-wrap">

                            {tagServices.map((tag) => {
                                if (tag?.type === "service") return <Tag key={tag.id}> {tag.value} </Tag>
                            })}

                        </div>
                    </div>}

                    {tagSkills.length > 0 && 
                    <div>
                        <h3>Skills</h3>
                        <div className="flex flex-wrap">

                            {tagSkills.map((tag) => {
                                if (tag?.type === "service") return <Tag key={tag.id}> {tag.value} </Tag>
                            })}

                        </div>
                    </div>}

                </div>}
                
            </div>
        </div>

        </header>


    </div> )
}