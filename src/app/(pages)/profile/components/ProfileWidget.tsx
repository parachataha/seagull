"use client"
import React, { useEffect, useState } from "react";
import HorizontalAdd from "@/app/components/AddButtons/HorizontalAdd/HorizontalAdd";
import Connections from "@/app/components/User/Connections/Connections";
import EditTags from "@/app/components/Tags/EditTags"

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { UserTag } from "@/types/user_tag";

interface Props {
    user: User,
    editMode: boolean
    setEditMode: (arg: boolean) => void
}

export default function ProfileWidget( {user, editMode, setEditMode} : Props ) {

    const [tagLabels, setTagLabels] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "label"));
    const [tagServices, setTagServices] = useState<UserTag[]>(user.tags?.filter((tag) => tag.type === "service"));
    const [tagSkills, setTagSkills] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "skill"));

    function getAvatar() : string {

        let avatar = user.avatar
        const pattern = /^seagull\//;

        if (pattern.test(user.avatar)) {
            const file = avatar.split("seagull/")[1]
            avatar = `/images/public/avatars/${file}`;
        }

        return avatar;

    }

    // Edit mode
    const [editedLabelTags, setEditedLabelTags] = useState<number[]>([])
    const [newLabelTags, setNewLabelTags] = useState<UserTag[]>( tagLabels )

    const [editedServiceTags, setEditedServiceTags] = useState<number[]>([])
    const [newServiceTags, setNewServiceTags] = useState<UserTag[]>( tagServices )

    const [editedSkillTags, setEditedSkillTags] = useState<number[]>([])
    const [newSkillTags, setNewSkillTags] = useState<UserTag[]>( tagSkills )

    useEffect(() => {
        setTagLabels(user.tags.filter((tag) => tag.type === "label"));
        setNewLabelTags(user.tags.filter((tag) => tag.type === "label"));
        setTagServices(user.tags.filter((tag) => tag.type === "service"));
        setNewServiceTags(user.tags.filter((tag) => tag.type === "service"));
        setTagSkills(user.tags.filter((tag) => tag.type === "skill"));
        setNewSkillTags(user.tags.filter((tag) => tag.type === "skill"));
    }, [user])

    return ( 
        <div className={`widget ${editMode ? "dashed" : ""} rounded items-center gap-3 ${styles.userWidget}`}>

            {/* BASIC USER DATA */}
            <div className="flex gap-3 items-center">
                <img 
                    src={getAvatar()} alt="Avatar" 
                    className={`${styles.avatar}`}
                    width={110} height={110}
                />

                <div>
                    <h1 className='capitalize text-[20px]'> {user.firstName} {user.lastName} </h1>
                    <Connections user={user}/>

                    {tagLabels.length > 1 ? 
                        <EditTags 
                            className='mt-1' 
                            ogTags={tagLabels} 
                            tags={newLabelTags} 
                            setTags={setNewLabelTags}
                            editedTags={editedLabelTags}
                            setEditedTags={setEditedLabelTags}
                        />
                    :
                        <HorizontalAdd> Add Labels </HorizontalAdd>
                    }
                </div>
            </div>

            {/* TAGS DATA */}
            <h3 className="subtitle grey mb-1 mt-3"> Services </h3>
            {tagServices.length > 0 ?
                <EditTags
                    className='mt-1' 
                    ogTags={tagServices} 
                    tags={newServiceTags} 
                    setTags={setNewServiceTags}
                    editedTags={editedServiceTags}
                    setEditedTags={setEditedServiceTags}
                />
            :
                <HorizontalAdd> Add Services </HorizontalAdd>    
            }

            <h3 className="subtitle grey mb-1 mt-3"> Skills </h3>
                {tagSkills.length > 0 ? 
                    <EditTags 
                    className='mt-1' 
                    ogTags={tagSkills} 
                    tags={newSkillTags} 
                    setTags={setNewSkillTags}
                    editedTags={editedSkillTags}
                    setEditedTags={setEditedSkillTags}
                />
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