
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const defaultAvatar = "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWkJFTETqQ9siFb6I2MDh07RmWVynLSBzdeX3q"

export default function UserAvatar( { className, src = defaultAvatar, name } : { className?: string, src: string | undefined, name: string }  ) {

    return (
        <Avatar className={className}>
            <AvatarImage className={className} src={src || defaultAvatar} />
            {/* Get first 2 letters of the name */}
            <AvatarFallback className={className}> {name.split("")[0]}{name.split("")[1]} </AvatarFallback>
        </Avatar>
    )
}