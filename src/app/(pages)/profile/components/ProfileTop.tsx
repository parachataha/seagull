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

export default function ProfileTop() {

    const user = useSelector((state: RootState) => state.user);

    const [editMode, setEditMode] = useState<boolean>(false);

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    return ( <>
        <header className={`container ${styles.container}`}>
        {editMode && <div className='mb-5 widget yellow flex justify-between'> 
            You have unsaved changes! 
            <button className="button yellow">Save</button>
        </div> }

            <div className="grid md:grid-cols-[35%_65%]">
                <div>
                    <ProfileWidget user={user} editMode={editMode} setEditMode={setEditMode} />
                </div>
            </div>

        </header>
    </> )

}