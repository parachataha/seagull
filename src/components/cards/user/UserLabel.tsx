"use client"

import { RootState } from "@/app/redux/store";
import UserAvatar from "@/components/images/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";
import { useSelector } from "react-redux";


export default function UserLabel ( {
    className = ""
} : {
    className?: string
} ) {

    const user = useSelector((state : RootState) => state.user);
    
    if (user) return ( <Button variant="ghost" className={`rounded-lg ${className}`}>
        
        <div className="flex items-center gap-3">
            <UserAvatar 
                src={user.avatar.url}
                name={user.name}
                className="w-6 h-6"
            />
            <div className="flex flex-col">
                <h3 className="">{user.name}</h3>
            </div>
        </div>

    </Button>
    );
}