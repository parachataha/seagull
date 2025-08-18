"use client"

// hooks
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Types
import { RootState } from "@/app/redux/store";
import { Button, LinkButton } from "../ui/button";
import { useEffect } from "react";

/**
 * This function is used to display the manage blogs button if the authenticated user is viewing their /user/[user]/blogs page.
 */

export default function ManageButton ( {
    children,
    className = ""
    } : {
    children?: React.ReactNode,
    className?: string
} ) {
    
    const pathname = usePathname();
    const user = useSelector((state : RootState) => state.user);

    useEffect(() => {
        console.log(user)
    }, [user])
    
    return ( 
        <>
            {(user.slug && pathname.includes(user.slug)) && 
                <LinkButton 
                    href="/profile/blogs" 
                    variant="neutral"
                    className={`${className}`}
                >
                    {children}
                </LinkButton> 
            }
        </>
    )
}