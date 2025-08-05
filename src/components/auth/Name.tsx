"use client"
/**
 * Used to display the user's name
 */

import { RootState } from "@/app/redux/store";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function Name( { className } : { className?: string }  ) {

    const selector = useSelector((state : RootState) => state.user);
    
    return ( <span className={cn(className)}>
        {selector?.name || "John Doe"}
    </span>
    );
}