"use client";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Components
import CreateProjectButton from "./items/CreateProjectButton";

// Types
import { RootState } from "@/app/redux/store";

/**
 * Used to display the editable timeline component. 
 * This is used to allow users to edit their timelines.
*/

export default function EditableTimeline( { className } : { className?: string } ) {
    
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);

    return ( <div>

        <div className="relative">

            <div className={`
                w-0.5 bg-foreground/20
                absolute top-[0%]
                left-[50%] translate-x-[-50%]
                h-full
            `}> </div>

            <div className="grid grid-cols-[48%_48%] gap-8">

                <CreateProjectButton className={className} />
                <div> </div>

            </div>

        </div>

    </div>
    );
}