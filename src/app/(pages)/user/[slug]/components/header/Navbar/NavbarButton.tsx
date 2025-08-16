"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavbarButton( {href, children, className} : {href: string, children: React.ReactNode, className?: string} ) {

    const pathname = usePathname()
    
    return ( <Link href={href} className={`${pathname == href && ""} text-foreground/80 hover:bg-background/30 !px-4 !py-4 ${className ?? ""}`}>

        {children}

    </Link>
    );
}