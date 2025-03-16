import Link from "next/link"
import styles from "./HorizontalUserWidget.module.css"
import Avatar from "../../Avatar/Avatar"

interface Props {
    index: number,
    user: {
        id: number,
        slug: string,
        firstName: string,
        lastName: string,
        avatar: number,
        avatar_url: string
    }
}

export default function HorizontalUserWidget( {index, user} : Props ) {


    return ( <Link className={`flex gap-3 items-center ${styles.horizontalUserWidget} ${index == 0 ? styles.first : ""}`} href={`/user/${user.slug}/`}>
        
        <Avatar avatar_url={user.avatar_url} avatar={user.avatar} size={50}/>

        <div>
            <h3 className={`capitalize font-semibold ${styles.name}`}> {user.firstName} {user.lastName} </h3>
            <p className='grey'> @{user.slug} </p>
        </div>
    
    </Link> )
}
