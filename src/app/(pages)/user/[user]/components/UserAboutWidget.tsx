import React from "react"

interface Props { 
    about: string | null
}

export default function UserAboutWidget( {about} : Props ) {

    if (about) return ( <div className="widget">

        <h3 className="subtitle grey">About</h3>
        <p> 
            {about.split("\n").map((line, index) => {
                return <React.Fragment key={index}> 
                    {line.trim()} <br/>
                </React.Fragment>
            })}    
        </p>

    </div> )
}