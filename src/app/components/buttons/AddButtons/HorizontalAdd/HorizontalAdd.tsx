import styles from "./HorizontalAdd.module.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    className?: string,
}

export default function HorizontalAdd( {children, className, ...attr} : Props ) {

    return ( <button className={`my-[2px] ${styles.button} ${className}`} {...attr}>
        + {children}
    </button> )
}