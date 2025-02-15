import './Tag.css'

import { UserTag } from "@/types/user_tag";

interface Props {
    data?: UserTag,
    children: React.ReactNode
}

export default function Tag( {data, children} : Props ) {

    const className = `
    ${data?.value?.trim()} 
    ${data?.value?.trim().toLowerCase()} 
    ${data?.value?.replaceAll("-", " ").trim().toLowerCase()}
    ${data?.value?.replaceAll("_", " ").trim().toLowerCase()}
    ${data?.value?.replaceAll("-", "").trim().toLowerCase()}
    ${data?.value?.replaceAll("_", " ").trim().toLowerCase()}
    ${`${children}`.trim()} 
    ${`${children}`.trim().toLowerCase()} 
    ${`${children}`.replaceAll("-", " ").trim().toLowerCase()}
    ${`${children}`.replaceAll("_", " ").trim().toLowerCase()}
    ${`${children}`.replaceAll("-", "").trim().toLowerCase()}
    ${`${children}`.replaceAll("_", " ").trim().toLowerCase()}
    `.trim()

    return (
        <div className={`Tag capitalize ${className}`}> {children} </div>
    )
}