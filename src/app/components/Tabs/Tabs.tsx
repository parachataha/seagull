"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Styles
import styles from "./Tabs.module.css"

interface Props {
    className?: string,
    links: { href: string, text: string }[]
}

export default function Tabs( {className, links} : Props ) {

    const router = usePathname();

    useEffect(() => {
        links.forEach((link, index) => {
            if (link.href == router) {
                setActive(index)
            }
        })
    }, [router])

    const [active, setActive] = useState<number | undefined>(0)

    return (

        <nav className={`wrapper ${className} ${styles.tabs}`}>

            <div className="max-w-[800px] w-[100%] flex justify-between">

                {links.map((link, index) => {
                    return <div key={index} className={`flex flex-col`} onClick={() => setActive(index)}>
                        <Link className={`pb-1 pt-8 ${styles.link} ${active == index ? styles.active : ""}`} href={link.href}> {link.text} </Link>  
                        <div className={`${styles.linkBottom} ${active == index ? styles.active : ""}`}></div> 
                    </div> 
                })}


            </div>
            <div className={`${styles.bottom}`}> </div>

        </nav>

    )
}