import UserAvatar from "@/components/images/UserAvatar";
import { PublicSafeUser } from "@/lib/types/User";
import { Heading } from "@once-ui-system/core";


export default function UserHeader ( {
    user
} : {
    user: PublicSafeUser
} ) {
    
    return ( <div>

        <UserAvatar
            src={user.avatar?.url}
            name={user.name}
            className={`w-20 h-20 mb-2`}
        />

        <Heading variant="heading-strong-xl"> {user.name} </Heading>
        
    </div>
    );
}