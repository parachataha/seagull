"use client"
// Types
import { RootState } from "@/app/redux/store";

// Hooks
import { useSelector } from "react-redux";

// Components
import UserAvatar from "../images/UserAvatar";
import { Button, LinkButton } from "../ui/button";

export default function NavbarUserLabel() {

    const user = useSelector((state : RootState) => state.user);
    
    return (

        <div className="border-l border-l-foreground/20 pl-2">
            <LinkButton variant="ghost" className="flex gap-2" href="/profile">
                <UserAvatar
                    className="w-6 h-6"
                    src={user.avatar?.url}
                    name={user.name}
                />
                <p> {user.name} </p>
            </LinkButton>
        </div>

        
    );
}