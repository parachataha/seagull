import Tag from "@/app/components/Tags/Tag";

// Styles
import styles from "../user.module.css"

// Types
import { User } from "@/types/auth";

interface Props {
    user: User
}

export default async function UserWidget( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");

    function getAvatar() : string {

        let avatar = user.avatar
        const pattern = /^seagull\//;

        if (pattern.test(user.avatar)) {
            const file = avatar.split("seagull/")[1]
            avatar = `/images/public/avatars/${file}`;
        }

        return avatar;

    }

    return ( 
        <div className={`widget rounded flex items-center gap-3 ${styles.userWidget}`}>

            <img 
                src={getAvatar()} alt="Avatar" 
                className={`${styles.avatar}`}
                width={110} height={110}
            />

            <div>
                <h1 className='capitalize text-[24px]'> {user.firstName} {user.lastName} </h1>
                <div className="flex gap-3 font-medium">
                    <p> {user.followersCount} followers </p>
                    <p> {user.followingCount} following </p>
                </div>
                {tagLabels.length > 1 && <div className='mt-[6px] flex gap-2'>
                    {tagLabels.map(tag => {
                        return <Tag key={tag.id}> {tag.value} </Tag>
                    })}
                </div>}
            </div>

        </div>
    )
}