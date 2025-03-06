"use client"
import React, { useEffect, useState } from "react";
import HorizontalAdd from "@/app/components/AddButtons/HorizontalAdd/HorizontalAdd";
import Connections from "@/app/components/User/Connections/Connections";
import EditTags from "@/app/components/Tags/EditTags"

// Icons
import { FaPlusMinus } from "react-icons/fa6";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { UserTag } from "@/types/user_tag";

interface Props {
    user: User;
    editMode: boolean;
    canceled: boolean;
    setEditMode: (arg: boolean) => void;
    
    // Tags state
    tagLabels: UserTag[];
    tagServices: UserTag[];
    tagSkills: UserTag[];
    setTagLabels: (tags: UserTag[]) => void;
    setTagServices: (tags: UserTag[]) => void;
    setTagSkills: (tags: UserTag[]) => void;

    // Edit state
    editedLabelTags: number[];
    setEditedLabelTags: (tags: number[]) => void;
    newLabelTags: UserTag[];
    setNewLabelTags: React.Dispatch<React.SetStateAction<UserTag[]>>,

    editedServiceTags: number[];
    setEditedServiceTags: (tags: number[]) => void;
    newServiceTags: UserTag[];
    setNewServiceTags: React.Dispatch<React.SetStateAction<UserTag[]>>,

    editedSkillTags: number[];
    setEditedSkillTags: (tags: number[]) => void;
    newSkillTags: UserTag[];
    setNewSkillTags: React.Dispatch<React.SetStateAction<UserTag[]>>,
}


export default function ProfileWidget({ 
    user, 
    editMode, 
    setEditMode, 
    canceled,

    tagLabels,
    setTagLabels,
    tagServices,
    setTagServices,
    tagSkills,
    setTagSkills,

    editedLabelTags,
    setEditedLabelTags,
    newLabelTags,
    setNewLabelTags,

    editedServiceTags,
    setEditedServiceTags,
    newServiceTags,
    setNewServiceTags,

    editedSkillTags,
    setEditedSkillTags,
    newSkillTags,
    setNewSkillTags

} : Props) {

    function getAvatar() : string {

        let avatar = user.avatar
        const pattern = /^seagull\//;

        if (pattern.test(user.avatar)) {
            const file = avatar.split("seagull/")[1]
            avatar = `/images/public/avatars/${file}`;
        }

        return avatar;

    }

    useEffect(() => {
        setTagLabels(user.tags.filter((tag) => tag.type === "label"));
        setNewLabelTags(user.tags.filter((tag) => tag.type === "label"));
        setTagServices(user.tags.filter((tag) => tag.type === "service"));
        setNewServiceTags(user.tags.filter((tag) => tag.type === "service"));
        setTagSkills(user.tags.filter((tag) => tag.type === "skill"));
        setNewSkillTags(user.tags.filter((tag) => tag.type === "skill"));

        setEditMode(false)
    }, [user])

    useEffect(() => {

        setEditMode(false)
        if (JSON.stringify(newLabelTags) !== JSON.stringify(tagLabels)) { setEditMode(true);}
        else if (JSON.stringify(newServiceTags) !== JSON.stringify(tagServices)) { setEditMode(true); }
        else if (JSON.stringify(newSkillTags) !== JSON.stringify(tagSkills)) { setEditMode(true); }
        else { setEditMode(false) }

    }, [newLabelTags, newServiceTags, newSkillTags])

    const [addTagMode, setAddTagMode] = useState<"label" | "service" | "skill" | null>()

    // Reset changes
    useEffect(() => {

        if (canceled) {
            setNewLabelTags(user.tags.filter((tag) => tag.type === "label"));
            setNewServiceTags(user.tags.filter((tag) => tag.type === "service"));
            setNewSkillTags(user.tags.filter((tag) => tag.type === "skill"));

            setTagLabels(user.tags.filter((tag) => tag.type === "label"))
            setTagServices(user.tags.filter((tag) => tag.type === "service"))
            setTagSkills(user.tags.filter((tag) => tag.type === "skill"))

            setEditedLabelTags([])
            setEditedServiceTags([])
            setEditedSkillTags([])
        }

    }, [canceled])

    return ( 
        <div className={`widget ${editMode ? "dashed" : ""} rounded items-center gap-3 ${styles.userWidget}`}>

            {/* BASIC USER DATA */}
            <div className="flex gap-3 items-center">
                <img 
                    src={getAvatar()} alt="Avatar" 
                    className={`${styles.avatar}`}
                    width={110} height={110}
                />

                <div className='flex flex-col flex-grow'>
                    <h1 className='capitalize text-[20px]'> {user.firstName} {user.lastName} </h1>
                    <Connections user={user}/>

                    {tagLabels.length > 1 ? 
                        <div className='gap-1 flex justify-between items-center'>
                            <EditTags 
                                className='mt-1' 
                                ogTags={tagLabels} 
                                tags={newLabelTags} 
                                setTags={setNewLabelTags}
                                type="label"
                                editedTags={editedLabelTags}
                                setEditedTags={setEditedLabelTags}
                                editMode={addTagMode == "label" ? true : false}
                                setEditMode={setAddTagMode}
                            />
                            <button onClick={() => setAddTagMode(addTagMode === "label" ? null : "label")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>
                        </div>
                    :
                        <HorizontalAdd> Add Labels </HorizontalAdd>
                    }
                </div>
            </div>

            {/* TAGS DATA */}
            <span className="flex items-center justify-between gap-2 mb-1 mt-3">
                <h3 className="subtitle grey"> Services </h3> 
                {tagServices.length > 0 && <button onClick={() => setAddTagMode(addTagMode === "service" ? null : "service")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>}
            </span>
            {tagServices.length > 0 ?
                <EditTags
                    className='mt-1' 
                    ogTags={tagServices} 
                    tags={newServiceTags} 
                    setTags={setNewServiceTags}
                    type="service"
                    editedTags={editedServiceTags}
                    setEditedTags={setEditedServiceTags}
                    editMode={addTagMode == "service" ? true : false}
                    setEditMode={setAddTagMode}
                />
            :
                <HorizontalAdd> Add Services </HorizontalAdd>    
            }

            <span className="flex items-center justify-between gap-2 mb-1 mt-3">
                <h3 className="subtitle grey"> Skills </h3> 
                {tagServices.length > 0 && <button onClick={() => setAddTagMode(addTagMode === "skill" ? null : "skill")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>}
            </span>
                {tagSkills.length > 0 ? 
                    <EditTags 
                    className='mt-1' 
                    ogTags={tagSkills} 
                    tags={newSkillTags} 
                    setTags={setNewSkillTags}
                    type="skill"
                    editedTags={editedSkillTags}
                    setEditedTags={setEditedSkillTags}
                    editMode={addTagMode == "skill" ? true : false}
                    setEditMode={setAddTagMode}
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