"use client"
// Types
import { RootState } from "@/app/redux/store";

// Hooks
import { useSelector } from "react-redux";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

/**
 * A component allowing users to see their private data such as email, password
 * And give the ability to change the details in the future 
 */
export default function PersonalDetails() {

    const user = useSelector((state : RootState) => state.user);

    const [open, setOpen] = useState<boolean>(false) // Dynamically show content
    
    return ( <Card className="bg-popover">

        <CardContent>

            <div className="flex justify-between items-start gap-2">
                <div>
                    <h3 className="font-semibold"> Personal details </h3>
                    <p className="text-foreground/60"> This data stays hidden from the public </p>
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={() => setOpen(!open)} variant="ghost"> {open ? <EyeClosedIcon /> : <EyeIcon />} </Button>
                    </TooltipTrigger>
                    <TooltipContent> {open ? "Collapse" : "Expand"} </TooltipContent>
                </Tooltip>
            </div>

            {open && <div className="flex items-center gap-16 mt-3">
                <div>
                    <Label className="translate-y-1.5"> Email </Label>
                    <div className="flex items-center gap-2">
                        <p> *************@{user.email.split("@")[1]} </p>
                        <Button variant="link">Show</Button>
                    </div>
                </div>
                <div>
                    <Label className="translate-y-1.5"> Password </Label>
                    <div className="flex items-center gap-2">
                        <p> *************** </p>
                        <Button variant="link">Change</Button>
                    </div>
                </div>
            </div>}

        </CardContent>
        
    </Card>
    );
}