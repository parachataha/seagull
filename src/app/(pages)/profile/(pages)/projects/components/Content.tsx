"use client"
// Hooks
import { RootState } from "@/app/redux/store";

// Components
import Timeline from "@/components/timeline/Timeline";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function Content( { 
    className = ""
} : { 
    className?: string 
} ) {

    // Hooks
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    return ( <div> 
        
        <Timeline isOwner/>

    </div>
    );
}