"use client"
import React, { useState } from "react"
import Tag from "./Tag"

// Types
import { UserTag } from "@/types/user_tag"

interface Props {
    ogTags: UserTag[],
    tags: UserTag[],
    setTags: React.Dispatch<React.SetStateAction<UserTag[]>>,

    editedTags: number[],
    setEditedTags: (arg: number[]) => void,

    className?: string
}

export default function Tags( {ogTags, className, tags, setTags, editedTags, setEditedTags} : Props ) {

    const [editingId, setEditingId] = useState<number | null>()

    function handleChange(e : any, index : number, id : number) {
        setTags(prevTags => { 

            const newTags = [...prevTags];
            newTags[index] = {
                ...prevTags[index],
                value: e.target.value
            }
            
            if (prevTags !== newTags && prevTags[index] !== ogTags[index]) { setEditedTags( Array.from(new Set([...editedTags, id])) ) }
            
            return newTags
    
        })
    }

    if (ogTags.length) return ( <div className={`flex flex-wrap gap-2 mt-2 ${className}`}>

        {tags.map((tag, index) => {

            // When editing
            if (editingId === tag.id) return ( <React.Fragment key={tag.id}> 
                {/* Allow user to exit */}
                <div className="overlay" onClick={() => setEditingId(null)}> </div>
                {/* Edit text */}
                <div style={{zIndex: "5"}} onClick={() => setEditingId(tag.id)}>
                    <input
                        value={tags[index].value}
                        placeholder={tags[index].value}
                        onChange={(e) => handleChange(e, index, tag.id)}
                        className={`Tag ${editedTags.includes(tag.id) && "dashed"} text-center
                            ${tags[index].value} 
                            ${tags[index].value.toLowerCase()}
                            ${tags[index].value.toLowerCase().replaceAll(".", " ")}
                            ${tags[index].value.toLowerCase().replaceAll("-", " ")}
                            ${tags[index].value.toLowerCase().replaceAll("_", " ")}
                        `}
                    />
                </div> 
            </React.Fragment>
            )

            // When not editing
            else return (
                <div onClick={() => setEditingId(tag.id)} key={tag.id}>
                    <Tag className={`editable ${editedTags.includes(tag.id) && "dashed"}`}> {tag.value} </Tag>
                </div> 
            )

        })}

    </div> )
}