import './Tag.css'

import { UserTag } from "@/types/user_tag";

interface Props {
    data: UserTag
}

export default function Tag( {data} : Props ) {

    const className = `
    ${data.value.trim()} 
    ${data.value.trim().toLowerCase()} 
    ${data.value.replaceAll("-", " ").trim().toLowerCase()}
    ${data.value.replaceAll("_", " ").trim().toLowerCase()}
    ${data.value.replaceAll("-", "").trim().toLowerCase()}
    ${data.value.replaceAll("_", " ").trim().toLowerCase()}
    `.trim()

    return (
        <div className={`Tag capitalize ${className}`}> {data.value} </div>
    )
}