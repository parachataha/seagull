"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton ( {
    className = "",
    children
} : {
    className?: string,
    children?: React.ReactNode
} ) {

    const router = useRouter();
    
    return ( <button onClick={() => router.back()} className={`cursor-pointer ${className}`}>
        
        {children ? children : <ArrowLeft/>}
        
    </button>
    );
}