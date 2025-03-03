import './Tag.css'

import { UserTag } from "@/types/user_tag";

import { FaPen } from "react-icons/fa";

interface Props {
    data?: UserTag,
    children: React.ReactNode,
    className?: string
}

export default function Tag( {data, children, className} : Props ) {

    const newClassName = `
    ${data?.value?.trim()} 
    ${data?.value?.trim().toLowerCase()} 
    ${data?.value?.replaceAll("-", " ").trim().toLowerCase()}
    ${data?.value?.replaceAll("_", " ").trim().toLowerCase()}
    ${data?.value?.replaceAll("-", "").trim().toLowerCase()}
    ${data?.value?.replaceAll("_", " ").trim().toLowerCase()}
    ${`${children}`.trim()} 
    ${`${children}`.trim().toLowerCase()} 
    ${`${children}`.replaceAll("-", " ").trim().toLowerCase()}
    ${`${children}`.replaceAll(".", " ").trim().toLowerCase()}
    ${`${children}`.replaceAll("_", " ").trim().toLowerCase()}
    ${`${children}`.replaceAll("-", "").trim().toLowerCase()}
    ${`${children}`.replaceAll("_", " ").trim().toLowerCase()}
    `.trim().replaceAll(",", " ")

    return (
        <div className={`Tag ${className} ${newClassName} relative`}>
            {children}

            {className?.includes("editable") && <div className='edit-button'> <FaPen/> </div>}
            {className?.includes("edited") && <div className='edited-button'> <FaPen/> </div>}
        </div>
    )
}