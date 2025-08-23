"use client"

import { Button } from "../ui/button";
import { CheckIcon, Copy, CopyIcon, LinkIcon } from "lucide-react";
import React, { useState } from "react";

/**
 * A simple button to copy the current URL
 */

export default function CopyLinkButton ( {
    children,
    className = "",
    icon = "CopyIcon",
    iconOnly = false,
} : {
    children?: React.ReactNode;
    className?: string;
    icon?: "CopyIcon" | "LinkIcon",
    iconOnly?: boolean;
} ) {

    const [copied, setCopied] = useState(false)

    function handleClick() {
        setCopied(true)
        navigator.clipboard.writeText(`${window.location.href}`)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    
    return ( <>
        <Button
            className={className}
            onClick={ handleClick } 
            variant="neutral" 
            appearance="ghostBg"
            mode={iconOnly && "icon" || undefined}
        > 
            {copied ?
                <> <CheckIcon /> {!iconOnly && "Copied"} </>
                :
                <> {icon === "LinkIcon" ? <LinkIcon/> : <CopyIcon/>} {!iconOnly && "Copy link"} </>
            }
        </Button>
    </>);
}