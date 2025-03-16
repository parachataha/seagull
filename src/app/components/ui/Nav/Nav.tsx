"use client"
import { useSelector } from "react-redux";
import NavSearchBar from "./NavSearchBar";
import Link from "next/link"

import Avatar from "../../User/Avatar/Avatar";

// Types
import { RootState } from "@/app/redux/store";

// Styles
import styles from "./Nav.module.css"

// Icons
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import ProfileNavWidget from "../../User/summaries/ProfileNavWidget/ProfileNavWidget";
import Overlay from "../Modals/Overlay/Overlay";
import Dropdown from "../../buttons/Dropdown/Dropdown";

export default function Nav() {

    const user = useSelector((state: RootState) => state.user);
    const [showProfileWidget, setShowProfileWidget] = useState<boolean>(false)

    return ( <nav className='wrapper pt-6'>

        <div className={`container flex justify-between items-center relative`}>
            {showProfileWidget && <>
                <Overlay invisible className="z-[5]" onClick={() => setShowProfileWidget(showProfileWidget ? false : true)} />
                <ProfileNavWidget user={user} className="z-10 top-[50px] right-[calc(0%+20px)]"/>
            </>}

            <div className="left flex gap-3 items-center">
                <Link href='/' className={`${styles.seagull}`}>Seagull</Link>
            </div>

            <div className="right">
                
                <ul className='flex gap-3 items-center h-[30px]'>
                    <NavSearchBar/>
                    {user.id !== 0 ? <>
                        <Dropdown 
                            parentButton={ {text: "+", className: "text-[20px] rounded-[7px] py-[0.5px] px-[10px] bg-secondary-bg border-2 border-tertiary-bg grey"} }
                            items={ [ 
                                { text: "New Organization", link: true, href:"/organization/new" },
                                { text: "New Team", link: true, href:"/" } 
                            ] }
                        />
                        <button onClick={() => setShowProfileWidget(showProfileWidget ? false : true)}> <Avatar className='border-2 border-tertiary-bg' size={35} avatar_url={user.avatar_url} avatar={user.avatar}/> </button>
                    </> : <>
                        <Link className='p-1 bg-red-500 rounded-md' href='/login'>Login</Link>
                        <Link className='p-1 border border-red-500 text-red-500 rounded-md' href='/signup'>Signup</Link>
                    </>}
                </ul>

            </div>

        </div>
    </nav> )

}