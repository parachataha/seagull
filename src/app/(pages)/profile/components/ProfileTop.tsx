"use client"
import { useEffect, useState } from "react";
import ProfileWidget from "./ProfileWidget";
import { UserTag } from "@/types/user_tag";

import updateTags from "@/lib/auth/update/updateTags";
import updateAbout from "@/lib/auth/update/updateAbout";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/app/redux/slices/uiSlice";
import { updateUser } from "@/app/redux/slices/userSlice";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";
import Link from "next/link";

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
    const [about, setAbout] = useState<string | null>(user.about)

    const [error, setError] = useState<{isError: Boolean, msg: string}>({isError: false, msg: ""})

    useEffect(() => {
        setAbout(user.about)
    }, [user])

    async function handleSave() {

        if (ui.loading) {
            setError({isError: true, msg: "Please wait, loading"})
            return;
        }

        dispatch(startLoading())
        if ( newLabelTags !== tagLabels || newServiceTags !== tagServices || newSkillTags !== tagSkills ) {
            await handleUpdateTags()
        }

        if ( about !== user.about ) {
            await handleUpdateAbout()
        }
        dispatch(stopLoading())

    }

    async function handleUpdateTags() {

        setError({isError: false, msg: ""})

        if ( newLabelTags === tagLabels && newServiceTags === tagServices && newSkillTags === tagSkills ) {
            setError({isError: true, msg: "Nothing changed"});
            return;
        }

        if (newLabelTags.length > 5) {
            setError({isError: true, msg: "Too many label tags. Please remove some"});
            return;
        }
        
        if (newServiceTags.length > 15) {
            setError({isError: true, msg: "Too many service tags. Please remove some"});
            return;
        }
        
        if (newSkillTags.length > 40) {
            setError({isError: true, msg: "Too many skill tags. Please remove some"});
            return;
        }

        const validateTags = (tags : UserTag[]) => {
            return tags.some(tag => {
                if (!tag.value || (tag.type !== "label" && tag.type !== "service" && tag.type !== "skill")) {
                    setError({ isError: true, msg: "Invalid data" });
                    return true;
                }
        
                if (tag.value.length < 1) { 
                    setError({ isError: true, msg: `Tag ${tag.value} is too short` });
                    return true;
                }
        
                if (tag.value.length > 25) {
                    setError({ isError: true, msg: `Tag ${tag.value} is too long` });
                    return true;
                }
        
                if (tags.filter(tagInner => tag.value.toLowerCase() === tagInner.value.toLowerCase() && tag.id !== tagInner.id).length > 0) {
                    setError({ isError: true, msg: `${tag.value} is repeated multiple times` });
                    return true;
                }
        
                return false;
            });
        };
        if (validateTags(newLabelTags) || validateTags(newServiceTags) || validateTags(newSkillTags)) { 
            return;
        }

        const result = await updateTags([...newLabelTags, ...newServiceTags, ...newSkillTags])

        console.log(result)

        if (!result.success) {
            setError({isError: true, msg: result.msg});
            return;
        }

        dispatch(updateUser({ tags: [
            ...newLabelTags.map(tag => { return { ...tag, createdAt: "" } }), 
            ...newServiceTags.map(tag => { return { ...tag, createdAt: "" } }), 
            ...newSkillTags.map(tag => { return { ...tag, createdAt: "" } }) 
        ] }))
    
    }

    async function handleUpdateAbout() {

        setError({ isError: false, msg: "" })

        if (about === user.about) {
            return;
        }

        const result = await updateAbout(about, user.about);

        if (!result.success) {
            setError({ isError: true, msg: result.msg })
            return;
        }
        
        dispatch(updateUser({ about: about }))

    }

    return ( <>
        <header className={`container ${styles.container} relative`}>

        {error.isError && <div className='widget red mb-4'>

            <p className="text-primary-red text-lg font-semibold">An error occurred</p>
            <p className="text-white"> {error.msg} </p>

        </div> }

        {editMode && <div className='mb-4 widget yellow dashed flex justify-between items-center'> 
            <p className='flex-grow'> You have unsaved changes! </p>
            <div>
                <button className='mr-2 text-primary-yellow' onClick={() => { setCanceled(true); setEditMode(false) }}> cancel </button>
                <button className="button yellow" onClick={handleSave}>Save</button>
            </div>
        </div> }

        {/* {user.hireable && <div className='mb-4 widget green rounded flex justify-between items-center'> 
            <p className='font-semibold py-[6px] ml-2'> You're open for work </p>
            <Link href='' className='text-primary-green font-semibold mr-2 text-sm'> 0 requests </Link>
        </div>} */}

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