import './Tag.css'

// Types
import { User_Tag } from '@/generated/prisma';

// 
import { FaPen, FaTrashAlt } from "react-icons/fa";

interface Props {
    data?: User_Tag,
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
        </div>
    )
}