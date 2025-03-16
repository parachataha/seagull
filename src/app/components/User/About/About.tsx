import React from "react"

interface Props {
    about: string,
    editable: boolean,
    editMode?: boolean,
}

export default function About({about} : Props) {

    return ( <>
        {about && <p> 
            {about?.split("\n").map((line, index) => {
                return <React.Fragment key={index}> 
                    {line.trim()} <br/>
                </React.Fragment>
            })}    
        </p>}
    </> )

}

