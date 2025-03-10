import Overlay from "../Overlay/Overlay"
import styles from "./Modal.module.css"

// Types
interface Props {
    children: React.ReactNode,
    title?: string,
    description?: string
}

export default function Modal( {children, title, description} : Props ) {


    return ( <div>

        <Overlay/>

        <div className={`${styles.modal}`}>

            {(title || description) && <div className={styles.top}>
                <h3 className="subtitle grey"> {title} </h3>    
                {description && <p className='grey'> {description} </p>}
            </div>}

            {children}

        </div>

    </div> )
}