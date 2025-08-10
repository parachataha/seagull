/**
 * Used to display the TimelineHeader, TimelineContent and more.
 * @param - Depicts if the manage buttons should appear
 */

import TimelineHeader from "./TimelineHeader";


export default function Timeline( { 
    className = "",
    isOwner = false
 } : { 
    className?: string,
    isOwner?: boolean
} ) {
    
    return ( <div className={`${className}`}>

        <TimelineHeader isOwner={isOwner}/>
        
    </div>
    );
}