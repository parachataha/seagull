"use client"
import Tabs from "../../../components/Tabs/Tabs";
import ProfileTagsWidget from "./ProfileTagsWidget";
import ProfileWidget from "./ProfileWidget";
import ProfileAboutWidget from "./ProfileAboutWidget";

// Redux
import { useSelector } from "react-redux";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";

export default function ProfileHeader() {

    const user = useSelector((state: RootState) => state.user);

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    return ( <>
        <header className={`container ${styles.container}`}>

            <ProfileWidget user={user}/>

            <div className="grid md:grid-cols-2 pt-4 gap-4">
                <ProfileTagsWidget services={tagServices} skills={tagSkills} about={user.about ? true : false}/>
                <ProfileAboutWidget about={user.about}/>
            </div>

            <Tabs className='pb-8' links={[ 
                { href: `/profile`, text: "Home" },
                { href: `/profile/experience`, text: "Experience" },
                { href: `/profile/blogs`, text: "Blogs" },
                { href: `/profile/organizations`, text: "Organizations" },
                { href: `/profile/teams`, text: "Teams" }
            ]}/>

        </header>
    </> )

}