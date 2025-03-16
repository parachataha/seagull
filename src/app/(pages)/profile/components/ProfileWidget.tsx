"use client"
import React, { useEffect, useState } from "react";
import HorizontalAdd from "@/app/components/buttons/AddButtons/HorizontalAdd/HorizontalAdd";
import Connections from "@/app/components/User/Connections/Connections";
import EditTags from "@/app/components/Tags/EditTags"

// Icons
import { FaPen, FaPlusMinus } from "react-icons/fa6";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { UserTag } from "@/types/user_tag";
import EditAbout from "@/app/components/User/About/EditAbout";
import Link from "next/link";
import Avatar from "@/app/components/User/Avatar/Avatar";

interface Props {
    user: User;
    canceled: boolean;
    editMode: boolean;
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

    about: string | null,
    setAbout: (about: string | null) => void;
}


export default function ProfileWidget({ 
    user, 
    editMode, 
    setEditMode, 
    canceled,

    // About
    tagLabels,
    setTagLabels,
    tagServices,
    setTagServices,
    tagSkills,
    setTagSkills,

    // Tags
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
    setNewSkillTags,

    // About
    about, setAbout

} : Props) {

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

    const [editInfoMode, setEditInfoMode] = useState<"label" | "service" | "skill" | "about" | null>()

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

            setAbout(user.about)
        }

    }, [canceled])

    // Check for change
    useEffect(() => {
        setEditMode(false);
        if (about !== user.about) {
            setEditMode(true);
        }
        newLabelTags.forEach((tag, index) => {
            if (tag.value !== tagLabels[index].value) {
                setEditMode(true);
            }
        })
        newServiceTags.forEach((tag, index) => {
            if (tag.value !== tagServices[index].value) {
                setEditMode(true);
            }
        })
        newSkillTags.forEach((tag, index) => {
            if (tag.value !== tagSkills[index].value) {
                setEditMode(true);
            }
        })
    }, [about])

    return ( 
        <div className={`widget ${editMode ? "dashed" : ""} rounded items-center gap-3 ${styles.userWidget}`}>

            {/* BASIC USER DATA */}
            <div className="flex gap-3 items-center">
                <Avatar size={110} avatar={user.avatar} avatar_url={user.avatar_url}/>

                <div className='flex flex-col flex-grow'>
                    <Link href={`/user/${user.slug}/`}>
                        <h1 className='capitalize text-[20px] hover:underline'> {user.firstName} {user.lastName} </h1>
                    </Link>
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
                                editMode={editInfoMode == "label" ? true : false}
                                setEditMode={setEditInfoMode}
                            />
                            <button onClick={() => setEditInfoMode(editInfoMode === "label" ? null : "label")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>
                        </div>
                    :
                        <HorizontalAdd> Add Labels </HorizontalAdd>
                    }
                </div>
            </div>

            {/* TAGS DATA */}
            <span className="flex items-center justify-between gap-2 mb-1 mt-3">
                <h3 className="subtitle grey"> Services </h3> 
                {tagServices.length > 0 && <button onClick={() => setEditInfoMode(editInfoMode === "service" ? null : "service")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>}
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
                    editMode={editInfoMode == "service" ? true : false}
                    setEditMode={setEditInfoMode}
                />
            :
                <HorizontalAdd> Add Services </HorizontalAdd>    
            }

            <span className="flex items-center justify-between gap-2 mb-1 mt-3">
                <h3 className="subtitle grey"> Skills </h3> 
                {tagServices.length > 0 && <button onClick={() => setEditInfoMode(editInfoMode === "skill" ? null : "skill")} className='cursor-pointer text-sm grey hover:text-white'> <FaPlusMinus /> </button>}
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
                    editMode={editInfoMode == "skill" ? true : false}
                    setEditMode={setEditInfoMode}
                />
            : 
                <HorizontalAdd> Add Skills </HorizontalAdd>
            }

            {/* ABOUT DATA */}
            <span className="flex items-center justify-between gap-2 mb-1 mt-3">
                <h3 className="subtitle grey"> About </h3> 
                {(about && about.length > 0) && <button onClick={() => setEditInfoMode(editInfoMode === "about" ? null : "about")} className='cursor-pointer text-sm grey hover:text-white'> <FaPen /> </button>}
            </span>
            <EditAbout 
                about={about}
                setAbout={setAbout} 
                editMode={editInfoMode === "about" ? true : false}
                onSubmit={() => { 
                    if (about !== user.about) { setEditMode(true); } 
                    setEditInfoMode(null) } 
                }
                onRevert={() => { setAbout(user.about); setEditInfoMode(null) } }
            />
            
        </div>
    )
}