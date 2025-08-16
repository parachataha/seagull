/**
 * Used to display the TimelineHeader, TimelineContent and more.
 * @param - Depicts if the manage buttons should appear
 */

// Types
import { Timeline as TimelineType } from "@prisma/client";

// Components
import TimelineHeader from "./TimelineHeader";
import EditableTimeline from "./EditableTimeline";

export default function Timeline( { 
    className = "",
    timelines = [],

    isOwner = false,
    baseURL = "/profile/projects",
 } : { 
    className?: string,
    timelines: TimelineType[],

    isOwner?: boolean,
    baseURL?: string
} ) {
    
    return ( <div className={`${className}`}>

        <TimelineHeader 
            baseURL={baseURL} 
            timelines={timelines} 
            isOwner={isOwner}
        />

        {isOwner ? 
            <EditableTimeline/>
        : 
            <>
                tbc
            </>
        }
        
    </div>
    );
}