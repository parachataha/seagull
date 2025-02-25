import Link from "next/link"
import styles from "./HorizontalUserWidget.module.css"
import Avatar from "../Avatar/Avatar"

interface Props {
    key: number,
    user: {
        id: number,
        slug: string,
        firstName: string,
        lastName: string,
        avatar: string
    }
}

export default function HorizontalUserWidget( {key, user} : Props ) {


    return ( <Link key={key} className={`flex gap-3 items-center ${styles.horizontalUserWidget} ${key == 0 ? styles.first : ""}`} href={`/user/${user.slug}/`}>
        
        <Avatar avatar={user.avatar} size={50}/>

        <div>
            <h3 className={`capitalize font-semibold ${styles.name}`}> {user.firstName} {user.lastName} </h3>
            <p className='grey'> @{user.slug} </p>
        </div>
    
    </Link> )
}
