"use client"
import Tabs from "../../../components/Tabs/Tabs";
import ProfileWidget from "./ProfileWidget";

// Redux
import { useSelector } from "react-redux";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";

export default function ProfileTop() {

    const user = useSelector((state: RootState) => state.user);

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    return ( <>
        <header className={`container ${styles.container}`}>

            <div className="grid md:grid-cols-[35%_65%]">
                <div>
                    <ProfileWidget user={user}/>
                </div>
            </div>

        </header>
    </> )

}