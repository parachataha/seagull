/**
 * Displays the different timelines the user has created
 */

import { Timeline } from "@prisma/client";
import Link from "next/link";
import TimelineHeaderItem from "./TimelineHeaderItem";
import { Button } from "../ui/button";
import { Modal, ModalBody, ModalTrigger } from "../ui/animated-modal";
import NewTimelineDialog from "../dialogs/timelines/NewTimelineDialog";

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
    
    return ( <div className={`${className} mb-4`}>
        
        <nav className="px-2 pb-3">

            <div className="flex justify-between items-end gap-3 w-full overflow-x-auto pr-2">
                <div>
                    <h1 className="!mb-3 text-2xl font-semibold">Development</h1>
                    <div className="flex gap-2 items-end"> 
                        {timelines.length > 0 && 
                            <>
                                {timelines.map((timeline, index) => {
                                    
                                    return (
                                        <TimelineHeaderItem
                                            index={index}
                                            key={timeline.id}
                                            timeline={timeline} 
                                            baseURL={baseURL} 
                                        />
                                    )

                                })}
                            </>
                        }
                    </div>
                </div>
                
                <Modal>
                    <ModalTrigger asChild>
                        <Button 
                            variant="ghost"
                            className="!py-0 mb-0 !pb-0 translate-y-1.5"
                        > + </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <NewTimelineDialog />
                    </ModalBody>
                </Modal>
            </div>

        </nav>

    </div>
    );
}
