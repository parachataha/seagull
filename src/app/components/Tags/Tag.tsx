import { UserTag } from "@/types/user_tag";

interface Props {
    data: UserTag
}

export default function Tag( {data} : Props ) {

    const className = `${data.value.trim()} ${data.value.trim().toLowerCase()}`

    return (
        <div> {data.value} </div>
    )
}