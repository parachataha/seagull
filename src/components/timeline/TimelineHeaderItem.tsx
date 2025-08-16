"use client"

import { Button } from "@once-ui-system/core";
import { Timeline } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
            <Button className={`${url == pathname && "!bg-foreground/5"}`} variant="secondary" size="s"> 
                {timeline.name} 
            </Button>
        </Link>
    );
}