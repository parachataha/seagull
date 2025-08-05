
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function UserAvatar( { className, src, name } : { className?: string, src: string, name: string }  ) {

    return (
        <Avatar className={className}>
            <AvatarImage className={className} src={src} />
            {/* Get first 2 letters of the name */}
            <AvatarFallback className={className}> {name.split("")[0]}{name.split("")[1]} </AvatarFallback>
        </Avatar>
    )
}