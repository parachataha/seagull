import UserAvatar from "@/components/images/UserAvatar";
import { PublicSafeUser } from "@/lib/types/User";


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

        <h1 className="text-2xl font-semibold"> {user.name} </h1>
        
    </div>
    );
}