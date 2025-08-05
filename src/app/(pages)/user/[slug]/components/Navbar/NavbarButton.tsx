"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavbarButton( {href, children, className} : {href: string, children: React.ReactNode, className?: string} ) {

    const pathname = usePathname()

    useEffect(() => {
        console.log(pathname, href)
    }, [])
    
    return ( <Link href={href} className={`${pathname == href && ""} text-foreground/80 hover:bg-background/50 px-4 py-4 ${className ?? ""}`}>

        {children}

    </Link>
    );
}