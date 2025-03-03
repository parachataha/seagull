import Overlay from "../Overlay/Overlay"
import styles from "./Modal.module.css"

// Types
interface Props {
    title: string,
    description?: string,
    children: React.ReactNode;
}

export default function Modal( {title, description, children} : Props ) {


    return ( <div>

        <Overlay/>

        <div className={`${styles.modal}`}>

            <div className={`${styles.top}`}>
                <h3 className='subtitle'> {title} </h3>
                {description && <p className='mt-[2px] text-sm text-white/20'> {description} </p>}
            </div>

            <div className={`${styles.content}`}>

                {children}

            </div>

        </div>

    </div> )
}