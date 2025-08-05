import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";
import UserAvatar from "@/components/images/UserAvatar";
import ColorBanner from "@/components/images/ColorBanner";
import StickyCard from "@/components/ui/StickyCard";

export default function UserHeader( { className, user } : { className?: string, user: PublicSafeUser } ) {
    
    return ( 

        <Card className="p-0 overflow-hidden relative pb-6 border-0 shadow-none">
            <div className="flex flex-col gap-4">

                <ColorBanner className="h-20" imageURL={user.avatar.url} />

                <CardContent className="flex items-end gap-3 relative">
                    <div className="absolute bottom-[-15%] rounded-full border-card border-3">
                        <UserAvatar
                            className="h-28 w-28"
                            src={user.avatar.url}
                            name={user.name}
                        />
                    </div>
                    <div className="ml-32">
                        <h1 className="text-2xl capitalize font-semibold"> {user.name} </h1>
                        {user.label && <p className="text-foreground/60 text-lg"> {user.label} </p>}
                    </div>

                </CardContent>

            </div>
        </Card>
        
    );
}