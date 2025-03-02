import './Tag.css'

import { UserTag } from "@/types/user_tag";

import { FaPen } from "react-icons/fa";

interface Props {
    data?: UserTag,
    children: React.ReactNode,
    editable?: boolean,
    className?: string
}

export default function Tag( {data, children, editable, className} : Props ) {

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
        <div className={`Tag ${className} ${newClassName} relative ${editable ? "editable" : ""}`}>
            {children}
            {editable && <div className='edit-button'> <FaPen/> </div>}
        </div>
    )
}