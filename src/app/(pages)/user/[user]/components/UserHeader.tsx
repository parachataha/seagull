import Tag from "@/app/components/Tags/Tag";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";
import UserTagsWidget from "./UserTagsWidget";
import UserWidget from "./UserWidget";
import UserAboutWidget from "./UserAboutWidget";
import Tabs from "../../../../components/Tabs/Tabs";

interface Props {
    user: User
}

export default async function UserHeader( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    return ( <>
        <header className={`container ${styles.container}`}>

            <UserWidget user={user}/>

            <div className="grid md:grid-cols-2 pt-4 gap-4">
                <UserTagsWidget services={tagServices} skills={tagSkills} about={user.about ? true : false}/>
                <UserAboutWidget about={user.about}/>
            </div>

            <Tabs className='pb-8' links={[ 
                { href: `/user/${user.slug}`, text: "Home" },
                { href: `/user/${user.slug}/experience`, text: "Experience" },
                { href: `/user/${user.slug}/blogs`, text: "Blogs" },
                { href: `/user/${user.slug}/organizations`, text: "Organizations" },
                { href: `/user/${user.slug}/teams`, text: "Teams" }
            ]}/>

        </header>
    </> )

}