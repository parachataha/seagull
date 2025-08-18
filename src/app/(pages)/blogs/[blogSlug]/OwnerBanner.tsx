"use client"
// Types
import { RootState } from "@/app/redux/store";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function OwnerBanner ({ 
    children,
    className = ""
} : {
    children?: React.ReactNode,
    className?: string
}) {

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    return ( <div className="flex jusi">
        

    </div>
    );
}