import Tag from "./Tag"

// Types
import { UserTag } from "@/types/user_tag"

interface Props {
    tags: UserTag[],
    className?: string
}

export default function Tags( {tags, className} : Props ) {


    if (tags.length) return ( <div className={`flex flex-wrap gap-2 mt-2 ${className}`}>

        {tags.map(tag => {
            return <Tag key={tag.id}> {tag.value} </Tag>
        })}

    </div> )
}