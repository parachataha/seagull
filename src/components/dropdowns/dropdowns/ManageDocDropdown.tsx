"use client"

import ManageableDropdown from "../ManageableDropdown";

import { EllipsisVerticalIcon, EyeClosedIcon, Info, InfoIcon, Pen, PenIcon, PinIcon, Trash2Icon, TriangleAlert, TriangleAlertIcon } from "lucide-react";

export default function ManageDocDropdown ( {
    authorId
} : {
    authorId?: number
} ) {
    
    return (<>

        <ManageableDropdown
            ownerId={authorId}
            defaultActions={[ 
                { 
                    actions: [
                        { icon: <TriangleAlertIcon/>, label: "Report", variant: "destructive", hideToOwner: true },
                        { icon: <InfoIcon/>, label: "View details", disabled: true }
                    ] 
                }
            ]}
            ownerActions={[ 
                {   
                    label: "Manage",
                    actions: [
                        { icon: <PenIcon/>, label: "Edit" },
                        { icon: <PinIcon/>, label: "Pin" },
                        { icon: <EyeClosedIcon/>, label: "Hide", variant: "destructive" },
                        { icon: <Trash2Icon/>, label: "Delete", variant: "destructive", action: () => console.log("test") },
                    ] 
                }
            ]}
        />

    </>);
}