// Styles
import styles from "./Errors.module.css"

interface Props {
    text: string,
    header?: string,
    className?: string
}

export default function ErrorBanner( {text, header, className} : Props ) {

    return ( <div className={`${styles.ErrorBanner} ${className}`}> 

        <h3> {header ? header : "Please try again"} </h3>
        <p> {text} </p>

    </div> )
}