"use client"

// Types
import { RootState } from "@/app/redux/store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function CreateProjectButton( { 
    className
} : { 
    className?: string 
} ) {
    
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);

    return ( 
        <button className={`
        ${className} 
            bg-foreground/5 hover:bg-foreground/10
            text-foreground/40 hover:text-foreground/70
            transition-colors duration-200 ease-in-out
            cursor-pointer
            w-full h-70
            rounded-md flex items-center justify-center
        `
        }>
            <p>Create new Project</p>
        </button>   
    );
}