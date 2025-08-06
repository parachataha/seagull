"use client"
/**
 * This component is used as a normal card that sticks to wherever the user desires
 * The component visually is a normal card with bg-card, but then turns into a translucent 
 *  card with a blurred background for accessability.
 */

import { useEffect, useRef, useState } from "react"
import { Card } from "./card"

export default function StickyCard({ children, scrollY = 350, className } : { children: React.ReactNode, scrollY?: number, className?: string }) {

    const ref = useRef<HTMLDivElement | null>(null)

    const [isStuck, setIsStuck] = useState<boolean>(false)

    function handleScroll() {
        if (window.scrollY > scrollY) {
            setIsStuck(true)
        } else {
            setIsStuck(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])


    return ( <Card 
        className={`
            ${className}
            border-0 backdrop-blur-3xl
            shadow-none
            p-0
            sticky z-50 transition-colors duration-300 ease-in-out ${
            isStuck ? "!bg-card/20" : "!bg-card"
            }`} 
        ref={ref}
    >
        {children}
    </Card>
    );
}