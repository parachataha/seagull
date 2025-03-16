import { useSelector } from "react-redux"

// Styles
import styles from "./ProfileNavWidget.module.css"

// Types
import { User } from "@/types/auth"
import capitalize from "@/utils/capitalize"
import Avatar from "../../Avatar/Avatar"
import Link from "next/link"
import Connections from "../../Connections/Connections"
import Tags from "@/app/components/Tags/Tags"

interface Props {
    user: User,
    className?: string
}

export default function ProfileNavWidget( { user, className } : Props ) {

    return ( <div className={`absolute widget ${className && className}`}>

        {/* Top */}
        <div className="flex items-center gap-2">
            <Avatar avatar_url={user.avatar_url} size={60} avatar={user.avatar}/>
            <div>
                <Link href="/profile/"> <h3 className="text-lg font-semibold hover:underline"> {capitalize(user.firstName)} {capitalize(user.lastName)} </h3> </Link>
                <Connections user={user} />
                {/* <Tags tags={user.tags.filter((tag) => tag.type === "label")} /> */}
            </div>
        </div>

    </div> )

}