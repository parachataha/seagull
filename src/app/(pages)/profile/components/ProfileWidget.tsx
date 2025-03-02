import React from "react";
import Tag from "@/app/components/Tags/Tag";
import Link from "next/link";
import HorizontalAdd from "@/app/components/AddButtons/HorizontalAdd/HorizontalAdd";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";

interface Props {
    user: User
}

export default function ProfileWidget( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    function getAvatar() : string {

        let avatar = user.avatar
        const pattern = /^seagull\//;

        if (pattern.test(user.avatar)) {
            const file = avatar.split("seagull/")[1]
            avatar = `/images/public/avatars/${file}`;
        }

        return avatar;

    }

    return ( 
        <div className={`widget rounded items-center gap-3 ${styles.userWidget}`}>

            {/* BASIC USER DATA */}
            <div className="flex gap-3 items-center">
                <img 
                    src={getAvatar()} alt="Avatar" 
                    className={`${styles.avatar}`}
                    width={110} height={110}
                />

                <div>
                    <h1 className='capitalize text-[20px]'> {user.firstName} {user.lastName} </h1>
                    <div className="flex gap-3 font-medium ml-[2px]">
                        <Link href={`/user/${user.slug}/following`} className="cursor-pointer hover:underline"> {user.followingCount} following </Link>
                        <Link href={`/user/${user.slug}/followers`} className="cursor-pointer hover:underline"> {user.followersCount} followers </Link>
                    </div>
                    {tagLabels.length > 1 ? <div className='mt-[4px] flex flex-wrap gap-2'>
                        {tagLabels.map(tag => {
                            return <Tag key={tag.id}> {tag.value} </Tag>
                        })}
                    </div>
                    :
                        <HorizontalAdd> Add Labels </HorizontalAdd>
                    }
                </div>
            </div>

            {/* TAGS DATA */}
            <h3 className="subtitle grey mb-1 mt-3"> Services </h3>
            {tagServices.length > 0 ? <>
                <div className="flex flex-wrap gap-2">
                    {tagServices.map(tag => {
                        return <Tag key={tag.id}> {tag.value} </Tag>
                    })}
                </div>
            </>
            :
                <HorizontalAdd> Add Services </HorizontalAdd>    
            }

            <h3 className="subtitle grey mb-1 mt-3"> Skills </h3>
            {tagSkills.length > 0 ? <>
                <div className="flex flex-wrap gap-2">
                    {tagSkills.map(tag => {
                        return <Tag key={tag.id} editable={true}> {tag.value} </Tag>
                    })}
                </div>
            </> 
            : 
                <HorizontalAdd> Add Skills </HorizontalAdd>
            }

            {/* ABOUT DATA */}
            <h3 className="subtitle grey mt-3">About</h3>
            {user.about ? <p> 
                {user.about.split("\n").map((line, index) => {
                    return <React.Fragment key={index}> 
                        {line.trim()} <br/>
                    </React.Fragment>
                })}    
            </p> 
            : 
                <HorizontalAdd> Add About </HorizontalAdd>
            }

            {user.hireable ? <p className='font-semibold mt-4 text-green-500'> Open for work </p> : <p className='font-semibold mt-4 text-red-500'> Closed for work </p>}

        </div>
    )
}