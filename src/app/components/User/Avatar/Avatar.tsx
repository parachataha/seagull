import styles from "./Avatar.module.css"

interface Props {
    avatar: number,
    avatar_url: string,
    size: number,
    className?: string
}

export default function Avatar( {avatar, avatar_url, size, className} : Props ) {

    function getAvatar() : string {
        let userAvatar : string = avatar_url

        if (avatar <= 6) {
            switch (avatar) {
                case 1: userAvatar = "/images/public/yellow.svg"; break;
                case 2: userAvatar = "/images/public/blue.svg"; break;
                case 3: userAvatar = "/images/public/cyan.svg"; break;
                case 4: userAvatar = "/images/public/purple.svg"; break;
                case 5: userAvatar = "/images/public/green.svg"; break;
                case 6: userAvatar = "/images/public/orange.svg"; break;
            }
        } 
        
        return userAvatar;
    }

    return ( <img 
        src={getAvatar()} alt="Avatar" 
        className={`${styles.avatar} ${className && className}`}
        width={size} height={size}
        style={{
            width: `${size}px`,
            height: `${size}px`
        }}
    /> )
}