"use client"
import Tabs from "../../../components/Tabs/Tabs";
import ProfileWidget from "./ProfileWidget";
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";
import { UserTag } from "@/types/user_tag";
import updateTags from "@/lib/auth/update/updateTags";

export default function ProfileTop() {

    const user = useSelector((state: RootState) => state.user);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [canceled, setCanceled] = useState<boolean>(false);

    const [tagLabels, setTagLabels] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "label"));
    const [tagServices, setTagServices] = useState<UserTag[]>(user.tags?.filter((tag) => tag.type === "service"));
    const [tagSkills, setTagSkills] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "skill"));
    // Edit mode
    const [editedLabelTags, setEditedLabelTags] = useState<number[]>([])
    const [newLabelTags, setNewLabelTags] = useState<UserTag[]>( tagLabels )

    const [editedServiceTags, setEditedServiceTags] = useState<number[]>([])
    const [newServiceTags, setNewServiceTags] = useState<UserTag[]>( tagServices )

    const [editedSkillTags, setEditedSkillTags] = useState<number[]>([])
    const [newSkillTags, setNewSkillTags] = useState<UserTag[]>( tagSkills )


    async function handleUpdateTags() {
        const result = await updateTags([...newLabelTags, ...newServiceTags, ...newSkillTags])
    }

    return ( <>
        <header className={`container ${styles.container}`}>
        {editMode && <div className='mb-5 widget yellow flex justify-between items-center'> 
            You have unsaved changes! 
            <div>
                <button className='mr-2 text-primary-yellow' onClick={() => { setCanceled(true); setEditMode(false) }}> cancel </button>
                <button className="button yellow" onClick={handleUpdateTags}>Save</button>
            </div>
        </div> }

            <div className="grid md:grid-cols-[35%_65%]">
                <div>
                    <ProfileWidget 
                        user={user} 
                        editMode={editMode} 
                        setEditMode={setEditMode} 
                        canceled={canceled} 

                        tagLabels={tagLabels}
                        setTagLabels={setTagLabels}
                        tagServices={tagServices}
                        setTagServices={setTagServices}
                        tagSkills={tagSkills}
                        setTagSkills={setTagSkills}

                        editedLabelTags={editedLabelTags}
                        setEditedLabelTags={setEditedLabelTags}
                        newLabelTags={newLabelTags}
                        setNewLabelTags={setNewLabelTags}

                        editedServiceTags={editedServiceTags}
                        setEditedServiceTags={setEditedServiceTags}
                        newServiceTags={newServiceTags}
                        setNewServiceTags={setNewServiceTags}

                        editedSkillTags={editedSkillTags}
                        setEditedSkillTags={setEditedSkillTags}
                        newSkillTags={newSkillTags}
                        setNewSkillTags={setNewSkillTags}
                    />

                </div>
            </div>

        </header>
    </> )

}