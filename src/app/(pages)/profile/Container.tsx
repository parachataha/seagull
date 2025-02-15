"use client"

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"
import Tag from "@/app/components/Tags/Tag";

// Redux
import { useSelector } from "react-redux"

// Icons
import { FaEdit } from "react-icons/fa";

// Types
import Link from "next/link";
import updateAbout from "@/lib/auth/update/updateAbout";

// Styles
import { RootState } from "@/app/redux/store";
import styles from "./profile.module.css";

// Redux
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/redux/slices/userSlice";
import About from "@/app/components/pages/Profile/About";

export default function Container() {

    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);

    const [tagLabels, setTagLabels] = useState(user.tags.filter((tag) => tag?.type === "label"));
    const [tagServices, setTagServices] = useState(user.tags.filter((tag) => tag?.type === "service"));
    const [tagSkills, setTagSkills] = useState(user.tags.filter((tag) => tag?.type === "skill"));  

    // Editing profile 
    const [error, setError] = useState({isError: false, msg: "An error occurred"})

    return ( <div className='wrapper'>

        {error.isError && <p> 
            {error.msg}    
        </p>}

        <header className={`container ${styles.header}`}>

            <div className='flex justify-between'>
                <div className="left">
                    <h6 className={styles.user}>Creator</h6>
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

                <div className="right flex-col flex items-end max-w-[400px]">

                    {/* CONNECTIONS */}
                    <div className="flex mb-3">
                        <Link href={`/user/${user.slug}/followers`} className="hover:underline font-medium mr-2"> {user.followersCount} followers </Link>
                        <Link href={`/user/${user.slug}/following`} className="hover:underline font-medium"> {user.followingCount} following</Link>
                    </div>

                    {/* TAGS WIDGET */}
                    {(tagServices.length > 0 || tagSkills.length > 0) ? <div className="widget">

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

                    </div> : <div className='widget'>

                        <h3 className='subtitle grey'> You have no tags! </h3>
                        <p>List your labels, services and skills to let people know what you do!</p>
                        
                    </div>} 
                    
                </div>
            </div>

        </header>

        <main className={`container`}>

            <div className={`widget ${styles.nextSteps} mb-4`}>
                <h3 className={`subtitle grey mb-2`}> Your Next Steps </h3>

                <div className="flex gap-2">

                    {tagLabels.length === 0 && <div className={`widget ${styles.task}`}> 
                        <p>Add your first label</p>
                    </div>}

                    {tagServices.length === 0 && <div className={`widget ${styles.task}`}> 
                        <p>Add your first service</p>
                    </div>}

                    {tagSkills.length === 0 && <div className={`widget ${styles.task}`}> 
                        <p>Add your first skill</p>
                    </div>}

                </div>

            </div>

            <div className={`grid ${styles.gridOne}`}>
                
                <About setError={setError} error={error} styles={styles} user={user}/>

            </div>
        
                            
        </main>


    </div> )
}