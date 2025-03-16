import styles from "./Logo.module.css"

interface Props {
    logo: number,
    logo_url: string,
    size: number,
    className?: string
}

export default function Logo( {logo, logo_url, size, className} : Props ) {

    function getLogo() : string {
        let finalLogo : string = logo_url

        if (logo <= 6) {
            switch (logo) {
                case 1: finalLogo = "/images/public/yellow.svg"; break;
                case 2: finalLogo = "/images/public/blue.svg"; break;
                case 3: finalLogo = "/images/public/cyan.svg"; break;
                case 4: finalLogo = "/images/public/purple.svg"; break;
                case 5: finalLogo = "/images/public/green.svg"; break;
                case 6: finalLogo = "/images/public/orange.svg"; break;
            }
        } 
        
        return finalLogo;
    }

    return ( <img 
        src={getLogo()} alt="Logo" 
        className={`${styles.logo} ${className && className}`}
        width={size} height={size}
        style={{
            width: `${size}px`,
            height: `${size}px`
        }}
    /> )
}