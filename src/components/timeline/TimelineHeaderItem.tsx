"use client"

import { Timeline } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function TimelineHeaderItem( { 
    className,
    index,
    baseURL = "/profile/project",
    timeline
} : { 
    className?: string,
    baseURL: string,
    index: number,
    timeline: Timeline
} ) {

    const pathname = usePathname();
    const url = index === 0 ? baseURL : `${baseURL}/${timeline.name.trim().toLowerCase().replaceAll(" ", "-")}`
    useEffect(() => {
        console.log(url, pathname)
    }, [])
    
    return ( 
        <Link
            href={url} 
            className={`
                
            `}
        > 
            <Button className={`text-sm ${url == pathname && "!bg-foreground/5"}`} variant="secondary"> 
                {timeline.name} 
            </Button>
        </Link>
    );
}