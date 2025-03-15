import HorizontalAdd from "@/app/components/buttons/AddButtons/HorizontalAdd/HorizontalAdd"

// Styles
import styles from "./Timeline.module.css"

// Types
import { Experience } from "@/types/experience"

interface Props {
    experience: Experience[]
}

export default function Timeline( {experience} : Props ) {

    return ( <div className='grid grid-cols-2'>

        {experience.map((item, index) => {
            
            
            return ( <>
                item
            </> )
        })}

    </div> )
}