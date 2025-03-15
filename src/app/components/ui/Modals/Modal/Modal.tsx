import { FaX } from "react-icons/fa6"
import Overlay from "../Overlay/Overlay"
import styles from "./Modal.module.css"

// Types
interface Props {
    children: React.ReactNode,
    setShow: (arg: boolean) => void,
    noOverlayClickOff?: boolean,
    title?: string,
    description?: string,
}

export default function Modal( {children, title, description, setShow, noOverlayClickOff} : Props ) {


    return ( <div>

        <Overlay onClick={noOverlayClickOff ? () => null : () => setShow(false)}/>

        <div className={`${styles.modal}`}>

            {(title || description) && <div className={`${styles.top} flex justify-between items-center`}>
                <div>
                    <h3 className="subtitle grey"> {title} </h3>    
                    {description && <p className='grey'> {description} </p>}
                </div>
                <button onClick={() => setShow(false)} className='hover:bg-tertiary-bg rounded-full p-[6px]'> <FaX className="grey text-[15px]" /> </button>
            </div>}

            {children}

        </div>

    </div> )
}