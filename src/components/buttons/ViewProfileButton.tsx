"use client"
// Types
import { RootState } from "@/app/redux/store";

// Hooks
import { useSelector } from "react-redux";

// Components
import { LinkButton } from "../ui/button";
import { EyeIcon } from "lucide-react";

/**
 * Used as a button to let authenticated users view their own profile
 */

export default function ViewProfileButton() {

    const user = useSelector((state : RootState) => state.user);
    
    return ( 
        <LinkButton
            variant="ghost" 
            className="flex gap-1.5"
            href={`/user/${user.slug?.trim()}`}
        > 

            <EyeIcon size="8px"/> View 

        </LinkButton> 
    );
}