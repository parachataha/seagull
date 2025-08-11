/**
 * Displays the different timelines the user has created
 */

import { Timeline } from "@prisma/client";
import Link from "next/link";

export default function TimelineHeader( { 
    timelines = [],
    className = "",
    isOwner = false,
    baseURL = "/profile/project"
} : { 
    timelines: Timeline[]
    className?: string,
    isOwner?: boolean,
    baseURL?: string
} ) {
    
    return ( <div className={`${className}`}>
        
        <nav className="px-2 border-b border-b-foreground/30">

            {timelines.length > 0 && 
                <div className="flex gap-2 flex-wrap items-center"> 

                    {timelines.map(timeline => (

                        <Link 
                            href={`${baseURL}/${timelines[0].name.replaceAll(" ", "-")}`} 
                            className="text-foreground/80"
                        > 
                            Main 
                        </Link>

                    ))}

                </div>
            }

        </nav>

    </div>
    );
}