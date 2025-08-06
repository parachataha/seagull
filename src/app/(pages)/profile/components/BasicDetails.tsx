"use client"

// Types
import { RootState } from "@/app/redux/store";
import UserHeader from "@/components/cards/user/UserHeader/UserHeader";
import UpdateLabelDialog from "@/components/dialogs/user/edit/UpdateLabel";

// Components
import ColorBanner from "@/components/images/ColorBanner";
import UserAvatar from "@/components/images/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Globe, MapPin, PenBoxIcon, TimerReset } from "lucide-react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function BasicDetails( { className = "" } : { className?: string } ) {

    const user = useSelector((state : RootState) => state.user);
    
    return (
        <UserHeader isOwner className={`!bg-popover ${className}`} user={user}/>
    );
}