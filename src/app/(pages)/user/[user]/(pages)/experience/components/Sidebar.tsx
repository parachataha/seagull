"use client"
// Styles
import Tag from "@/app/components/Tags/Tag";
import styles from "./Sidebar.module.css"

// Types
import { User } from "@/types/auth"
import { useState } from "react";

interface Props {
    user: User
}

export default function Sidebar( {user} : Props ) {

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");

    return ( <div className={`${styles.sidebar} widget`}>

        <h3 className="grey subtitle">Filter By Tags</h3>
        
        {tagLabels.length && <> 
            <h3 className="subtitle mb-1">Labels</h3>
            <div className="flex gap-2 flex-wrap">
                {tagLabels.map((tag, index) => {
                    const [showing, setShowing] = useState<boolean>(true)
                    return ( 
                        <div onClick={() => setShowing(showing ? false : true)} key={index}>
                            <Tag className={`cursor-pointer ${showing ? "" : "grey"}`}> {tag.value} </Tag> 
                        </div> )
                })}
            </div>
        </>}

        {tagServices.length && <> 
            <h3 className="subtitle mb-1 mt-4">Services</h3>
            <div className="flex gap-2 flex-wrap">
                {tagServices.map((tag, index) => {
                    const [showing, setShowing] = useState<boolean>(true)
                    return ( 
                        <div onClick={() => setShowing(showing ? false : true)} key={index}>
                            <Tag className={`cursor-pointer ${showing ? "" : "grey"}`}> {tag.value} </Tag> 
                        </div> )
                })}
            </div>
        </>}

        {tagSkills.length && <> 
            <h3 className="subtitle mb-1 mt-4">Skills</h3>
            <div className="flex gap-2 flex-wrap">
                {tagSkills.map((tag, index) => {
                    const [showing, setShowing] = useState<boolean>(true)
                    return ( 
                        <div onClick={() => setShowing(showing ? false : true)} key={index}>
                            <Tag className={`cursor-pointer ${showing ? "" : "grey"}`}> {tag.value} </Tag> 
                        </div> )
                })}
            </div>
        </>}

    </div> )
}