// Styles
import styles from "./Errors.module.css"

interface Props {
    text: string,
    header?: string,
    className?: string
}

export default function ErrorBubble( {text, header, className} : Props ) {

    return ( <div className={`${styles.ErrorBanner} ${className} text-center`}> 

        {header && <h3 className={styles.header}> {header} </h3>}
        <p className={styles.text}> {text} </p>

    </div> )
}