import UserAvatar from "@/components/images/UserAvatar";
import { Card } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";


export default function VerticalUserLabel ( {
    user,
    className = ""
} : {
    user: PublicSafeUser,
    className?: string
} ) {
    
    return ( <Card className={`${className}`}>
        
        <div className="flex flex-col items-center gap-3">
            <UserAvatar 
                src={user.avatar.url}
                name={user.name}
                className="w-16 h-16"
            />
            <div className="text-center">
                <h3 className="text-lg text-foreground/70 font-semibold">{user.name}</h3>
                <p className="text-foreground/50 lowercase"> {user.slug} </p>
            </div>
        </div>

    </Card>
    );
}