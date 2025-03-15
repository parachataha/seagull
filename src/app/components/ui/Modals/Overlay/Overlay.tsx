import styles from "./Overlay.module.css"

interface Props {
    invisible?: boolean
    onClick?: () => void,
    className?: string
}

export default function Overlay( {onClick, className, invisible} : Props ) {
    return <div className={`${styles.overlay} ${invisible && styles.invisible} ${className && className} ${onClick && ""}`} onClick={onClick}>  </div>
}