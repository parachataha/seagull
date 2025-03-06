"use client"
import React, { useEffect, useState } from "react"
import Tag from "./Tag"

// Types
import { UserTag } from "@/types/user_tag"
import { FaCheck, FaPlus } from "react-icons/fa6"

interface Props {
    ogTags: UserTag[],
    tags: UserTag[],
    setTags: React.Dispatch<React.SetStateAction<UserTag[]>>,

    editedTags: number[],
    setEditedTags: (arg: number[]) => void,

    editMode: boolean,
    setEditMode: (arg: "label" | "service" | "skill" | null) => void,

    type?: "label" | "service" | "skill" | null
    className?: string
}

export default function Tags( {ogTags, className, tags, setTags, type, editedTags, setEditedTags, editMode, setEditMode} : Props ) {

    const [editingId, setEditingId] = useState<number | null>()

    const [addTagValue, setAddTagValue] = useState<string>("")

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

    function handleAddTag(e : any) {
        e.preventDefault()

        const id = Math.floor(Math.random() * 101) + 100;

        setTags([...tags, { 
            id: id, 
            createdAt: new Date(),
            tagOrder: 100, 
            verified: false, 
            link: null,
            userId: 1, 
            type: type ? type : tags[tags.length - 1].type,
            value: addTagValue.trim(),
        }])

        setAddTagValue("")
        setEditedTags([...editedTags, id])
    }

    function handleDeleteTag(index : number) {
        setTags( tags.filter((_, i) => i !== index) );
    }

    if (ogTags.length) return ( <div className={`flex flex-wrap gap-2 mt-2 ${className}`}>

        {editMode ? 
            tags.map((tag, index) => {
                
                return (
                    <div onClick={() => handleDeleteTag(index)} key={tag?.id} style={{zIndex: '5'}}>
                        <Tag className={`deletable ${(editedTags.includes(tag?.id) && tag?.value !== ogTags[index]?.value) && "dashed"}`}> {tag?.value} </Tag>
                    </div> 
                )

            }) 
        :
            tags.map((tag, index) => {

                // When editing
                if (editingId === tag.id) return ( <React.Fragment key={tag.id}> 
                    {/* Allow user to exit */}
                    <div className="overlay" onClick={() => setEditingId(null)}> </div>
                    {/* Edit text */}
                    <div style={{zIndex: "5"}} onClick={() => setEditingId(tag.id)}>
                        <input
                            style={{zIndex: '5'}}
                            value={tags[index].value}
                            placeholder={tags[index].value}
                            onChange={(e) => handleChange(e, index, tag.id)}
                            className={`Tag ${(editedTags.includes(tag.id) && tag?.value !== ogTags[index]?.value) && "dashed"} text-center
                                ${tags[index].value} 
                                ${tags[index]?.value.toLowerCase()}
                                ${tags[index]?.value.toLowerCase().replaceAll(".", " ")}
                                ${tags[index]?.value.toLowerCase().replaceAll("-", " ")}
                                ${tags[index]?.value.toLowerCase().replaceAll("_", " ")}
                            `}
                        />
                    </div> 
                </React.Fragment>
                )
                
                // When not editing
                else return (
                    <div onClick={() => setEditingId(tag?.id)} key={tag?.id} style={{zIndex: '5'}}>
                        <Tag className={`editable ${(editedTags.includes(tag?.id) && tag?.value !== ogTags[index]?.value) && "dashed"}`}> {tag?.value} </Tag>
                    </div> 
                )

            })
        }

        {editMode && <form>
            
            <div className="overlay" style={{zIndex: '4'}} onClick={() => { setAddTagValue(""); setEditMode(null) }}></div>
            <div className="relative" style={{zIndex: '5'}}>
                <input 
                    type="text" 
                    placeholder="New tag" 
                    value={addTagValue} 
                    onChange={(e) => setAddTagValue(e.target.value)} 
                    className={`
                        Tag dashed ${addTagValue.length <= 0 && "green bg-[rgba(0,255,0,0.1)_!important]"} 
                        ${addTagValue} ${addTagValue.toLowerCase()}
                        ${addTagValue.replaceAll(".", " ")}
                        ${addTagValue.replaceAll("-", " ")}
                        ${addTagValue.replaceAll("_", " ")}
                        ${addTagValue.toLowerCase().replaceAll(".", " ")}
                        ${addTagValue.toLowerCase().replaceAll("-", " ")}
                        ${addTagValue.toLowerCase().replaceAll("_", " ")}
                    `}
                />
                <button
                    onClick={handleAddTag} 
                    className='button green rounded absolute top-[-13%] right-[-10%] text-sm' 
                    disabled={addTagValue.trim().length <= 0}
                > 
                    {addTagValue.trim().length <= 0 ? <FaPlus />  : <FaCheck />}
                </button>
            </div>
            
        </form>}

    </div> )
}