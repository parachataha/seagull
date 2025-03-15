"use client"
import Link from "next/link"
import Overlay from "../../ui/Modals/Overlay/Overlay"
import styles from "./Dropdown.module.css"

// Styles
import React, { useState } from "react"

// Types
interface Props {
    parentButton: {
        text: string,
        className?: string
    }
    items: {
        text: string,
        icon?: React.ReactNode,
        link?: boolean,
        href?: string,
        onClick?: () => void,
    }[]
}

export default function Dropdown( {parentButton, items} : Props ) {

    const [show, setShow] = useState<boolean>(false)

    return ( <>
        <div className='relative'>

            <button className={parentButton?.className} onClick={() => setShow(show ? false : true)}> {parentButton.text} </button>

            {show && <div className='w-max flex flex-col bg-secondary-bg rounded-lg border-2 border-tertiary-bg absolute top-[115%] left-[50%] translate-x-[-50%] z-10'> 
                
                {items.map((item, index) => {
                    if (item?.link) { return <Link href={`${item.href}`} className={`text-white/80 z-10 p-1 ${index !== items.length - 1 ? "border-b-2 border-b-white/10" : ""}`} key={index}>
                        <div className='hover:bg-tertiary-bg rounded-lg p-[6px]'>
                            {item.text}
                        </div>
                    </Link> } else return <button onClick={item.onClick} className={`text-white/80 z-10 px-2 py-2 hover:bg-tertiary-bg ${index !== items.length - 1 ? "border-b-2 border-b-white/10" : ""}`} key={index}>
                        {item.text}
                    </button>
                })}
            

            </div>}
        </div> 
        {show && <Overlay invisible className="z-5" onClick={() => setShow(false)}/>}
    </>
    )
}