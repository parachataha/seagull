"use client"
import React, { useState } from "react"
import HorizontalAdd from "../../buttons/AddButtons/HorizontalAdd/HorizontalAdd"

interface Props {
    about: string | null,
    setAbout: (arg: string) => void,
    editMode?: boolean,
    onRevert: () => void,
    onSubmit: () => void
}

export default function EditAbout({about, setAbout, editMode, onRevert, onSubmit} : Props) {

    return ( <>
        {about && about.length > 0 ? <div> 
            {editMode ? <form className='flex flex-col' onSubmit={onSubmit}>

                <textarea 
                    name="about" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)}
                    rows={about.split("\n").length + 5}
                />
                <div className="flex items-center justify-center mt-2 ">
                    <button type='button' onClick={onRevert} className='button grey flex-grow'> Revert </button>
                    <button type='submit' className='button red flex-grow ml-2'> Ok </button>
                </div>

            </form> : 
            <> 
                {about.split("\n").map((line, index) => {
                    return <React.Fragment key={index}> 
                        {line.trim()} <br/>
                    </React.Fragment>
                })}     
            </>}
        </div> 
        : 
            <HorizontalAdd> Add About </HorizontalAdd>
        }
    </> )

}