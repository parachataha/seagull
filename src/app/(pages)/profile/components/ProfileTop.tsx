"use client"
import Tabs from "../../../components/Tabs/Tabs";
import ProfileWidget from "./ProfileWidget";
import { useEffect, useState } from "react";
import { UserTag } from "@/types/user_tag";
import updateTags from "@/lib/auth/update/updateTags";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/app/redux/slices/uiSlice";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";

export default function ProfileTop() {

    const user = useSelector((state: RootState) => state.user);
    const ui = useSelector((state: RootState) => state.ui);

    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState<boolean>(false);
    const [canceled, setCanceled] = useState<boolean>(false);

    const [tagLabels, setTagLabels] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "label"));
    const [tagServices, setTagServices] = useState<UserTag[]>(user.tags?.filter((tag) => tag.type === "service"));
    const [tagSkills, setTagSkills] = useState<UserTag[]>(user.tags.filter((tag) => tag.type === "skill"));

    // Edit Tags
    const [editedLabelTags, setEditedLabelTags] = useState<number[]>([])
    const [newLabelTags, setNewLabelTags] = useState<UserTag[]>( tagLabels )

    const [editedServiceTags, setEditedServiceTags] = useState<number[]>([])
    const [newServiceTags, setNewServiceTags] = useState<UserTag[]>( tagServices )

    const [editedSkillTags, setEditedSkillTags] = useState<number[]>([])
    const [newSkillTags, setNewSkillTags] = useState<UserTag[]>( tagSkills )

    // Edit About
    const [about, setAbout] = useState<string>(user.about)

    const [error, setError] = useState<{isError: Boolean, msg: string}>({isError: false, msg: ""})

    useEffect(() => {
        setAbout(user.about)
    }, [user])

    async function handleSave() {

        if ( newLabelTags !== tagLabels || newServiceTags !== tagServices || newSkillTags !== tagSkills ) {
            await handleUpdateTags()
        }

    }

    async function handleUpdateTags() {

        setError({isError: false, msg: ""})
        
        if (ui.loading) {
            setError({isError: true, msg: "Please wait, loading"})
            return;
        }
        
        startLoading()

        if ( newLabelTags === tagLabels && newServiceTags === tagServices && newSkillTags === tagSkills ) {
            setError({isError: true, msg: "Nothing changed"});
            stopLoading();
            return;
        }

        if (newLabelTags.length > 5) {
            setError({isError: true, msg: "Too many label tags. Please remove some"});
            stopLoading();
            return;
        }
        
        if (newServiceTags.length > 15) {
            setError({isError: true, msg: "Too many service tags. Please remove some"});
            stopLoading();
            return;
        }
        
        if (newSkillTags.length > 40) {
            setError({isError: true, msg: "Too many skill tags. Please remove some"});
            stopLoading();
            return;
        }

        newLabelTags.forEach((tag, index) => {

            if (!tag.value || (tag.type !== "label" && tag.type !== "service" && tag.type !== "skill")) {
                setError({ isError: true, msg: "Invalid data" })
                stopLoading();
                return;
            }
    
            if (tag.value.length < 1) { 
                setError({ isError: true, msg: `Tag ${tag.value} is too short` })
                stopLoading();
                return;
            }
    
            if (tag.value.length > 25) {
                setError({ isError: true, msg: `Tag ${tag.value} is too long` })
                stopLoading();
                return;
            }

            newLabelTags.forEach((tagInner, index) => {
                if (tag.value === tagInner.value && tag.id !== tagInner.id) {
                    setError({ isError: true, msg: `${tag.value} is repeated multiple times` })
                    return;
                }
            })
    
        })
        newServiceTags.forEach((tag, index) => {

            if (!tag.value || (tag.type !== "label" && tag.type !== "service" && tag.type !== "skill")) {
                setError({ isError: true, msg: "Invalid data" })
                stopLoading();
                return;
            }
    
            if (tag.value.length < 1) { 
                setError({ isError: true, msg: `Tag ${tag.value} is too short` })
                stopLoading();
                return;
            }
    
            if (tag.value.length > 25) {
                setError({ isError: true, msg: `Tag ${tag.value} is too long` })
                stopLoading();
                return;
            }

            newServiceTags.forEach((tagInner, index) => {
                if (tag.value === tagInner.value && tag.id !== tagInner.id) {
                    setError({ isError: true, msg: `${tag.value} is repeated multiple times` })
                    return;
                }
            })
    
        })
        newSkillTags.forEach((tag, index) => {

            if (!tag.value || (tag.type !== "label" && tag.type !== "service" && tag.type !== "skill")) {
                setError({ isError: true, msg: "Invalid data" })
                stopLoading();
                return;
            }
    
            if (tag.value.length < 1) { 
                setError({ isError: true, msg: `Tag ${tag.value} is too short` })
                stopLoading();
                return;
            }
    
            if (tag.value.length > 25) {
                setError({ isError: true, msg: `Tag ${tag.value} is too long` })
                stopLoading();
                return;
            }

            newSkillTags.forEach((tagInner, index) => {
                if (tag.value === tagInner.value && tag.id !== tagInner.id) {
                    setError({ isError: true, msg: `${tag.value} is repeated multiple times` })
                    return;
                }
            })
    
        })

        const result = await updateTags([...newLabelTags, ...newServiceTags, ...newSkillTags])

        if (!result.success) {
            setError({isError: true, msg: result.msg});
            stopLoading();
        }

        stopLoading();
    
    }

    async function handleUpdateAbout() {

    }

    return ( <>
        <header className={`container ${styles.container}`}>
        {editMode && <div className='mb-5 widget yellow flex justify-between items-center'> 
            You have unsaved changes! 
            <div>
                <button className='mr-2 text-primary-yellow' onClick={() => { setCanceled(true); setEditMode(false) }}> cancel </button>
                <button className="button yellow" onClick={handleSave}>Save</button>
            </div>
        </div> }

            <div className="grid md:grid-cols-[35%_65%]">
                <div>
                    <ProfileWidget 
                        user={user} 
                        editMode={editMode} 
                        setEditMode={setEditMode} 
                        canceled={canceled} 

                        // Tags
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

                        // About
                        about={about}
                        setAbout={setAbout}
                    />

                </div>
            </div>

        </header>
    </> )

}