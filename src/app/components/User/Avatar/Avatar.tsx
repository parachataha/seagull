import styles from "./Avatar.module.css"

interface Props {
    avatar: string,
    size: number,
}

export default function Avatar( {avatar, size} : Props ) {

    function getAvatar() : string {
        let userAvatar = avatar
        const pattern = /^seagull\//;

        if (pattern.test(avatar)) {
            const file = avatar.split("seagull/")[1]
            userAvatar = `/images/public/avatars/${file}`;
        }

        return userAvatar;
    }

    return ( <img 
        src={getAvatar()} alt="Avatar" 
        className={`${styles.avatar}`}
        width={size} height={size}
        style={{
            width: `${size}px`,
            height: `${size}px`
        }}
    /> )
}