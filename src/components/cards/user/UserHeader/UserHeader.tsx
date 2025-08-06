// Types
import { PublicSafeUser } from "@/lib/types/User";

// Components
import ColorBanner from "@/components/images/ColorBanner";
import UserAvatar from "@/components/images/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Clock, LucideIcon, MapPin, PenBoxIcon, TimerReset } from "lucide-react";

// Update X Dialogs
import UpdateLabelDialog from "@/components/dialogs/user/edit/UpdateLabel";
import UpdateLocationDialog from "@/components/dialogs/user/edit/UpdateLocation";
import UpdateTimezoneDialog from "@/components/dialogs/user/edit/UpdateTimezone";
import UpdateWorkHoursDialog from "@/components/dialogs/user/edit/UpdateWorkHours";

/**
 * Used to display all extra information items
 */

export default function UserHeader({
    className = "",
    user, 
    isOwner = false
} : {user: PublicSafeUser, isOwner?: boolean, className?: string}) {

    const extraInformation : { icon: LucideIcon, title: "Location" | "Timezone" | "Work hours", value: string }[] = [
        { icon: MapPin, title: "Location", value: user.location ? user.location : "None" },
        { icon: Clock, title: "Timezone", value: user.timezone ? user.timezone : "None" },
        { icon: TimerReset, title: "Work hours", value: (user.startWork || user.endWork) ? `${user.startWork || "None"} - ${user.endWork || "None"}` : "None" },
    ]
    
    return ( 
        
        <Card className={`bg-card p-0 overflow-hidden relative pb-4 border-0 shadow-none ${className}`}>
            <div className="flex flex-col gap-4">

                {/* COLOR BANNER */}
                <ColorBanner className="h-20" imageURL={user.avatar?.url} />

                <CardContent className="px-5">
                    <CardHeader className="relative gap-3 px-0">
                        <div className={`absolute top-[-28%] rounded-full border-card border-3 ${className.includes("bg-popover") && "!border-popover"}`}>
                            {/* USER AVATAR */}
                            <UserAvatar
                                className="h-28 w-28"
                                src={user.avatar?.url}
                                name={user.name}
                            />
                        </div>
                        <div className="mt-21 px-3">
                            {/* EDIT NAME */}
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl capitalize font-semibold"> {user.name ? user.name : "John Doe"} </h1>
                                {/* <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost"> <PenBoxIcon size="8px"/> </Button>
                                    </DialogTrigger>
                                    <UpdateNameDialog />
                                </Dialog> */}
                            </div>
                            
                            {/* EDIT LABEL */}
                            <div className="flex justify-between items-center">
                                <p className="text-foreground/60 text-lg"> {user.label ? user.label : "You do not have a label yet"} </p>
                                {isOwner && <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost"> <PenBoxIcon size="8px"/> </Button>
                                    </DialogTrigger>
                                    <UpdateLabelDialog /> { /* Update label dialog */ }
                                </Dialog>}
                            </div>
                        </div>
                    </CardHeader>
                    
                    {/* EXTRA INFORMATION - LOCATION, TIMEZONE AND OFFICE HOURS */}
                    <Card className="card bg-background/60 px-1 py-1 text-foreground/50">
                    <div className="flex gap-4">
                        {isOwner ? 
                            <>
                                {extraInformation.map(item => (
                                    <ExtraInformationItem isOwner={isOwner} key={item.title} item={item}/>
                                ))}
                            </> 
                        : 
                            <>
                                {user.location && <ExtraInformationItem item={extraInformation[0]}/> }
                                {user.timezone && <ExtraInformationItem item={extraInformation[1]}/> }
                                {(user.startWork && user.endWork) && <ExtraInformationItem item={extraInformation[2]}/> }
                            </>
                        }
                    </div>
                    </Card>
                </CardContent>

            </div>
        </Card>

    );
}

/**
 * @function ExtraInformationItem - Used to display each extra information item such as location, timezone and work hours
 * Also used to handle dialog opening and closing is editing data and isOwner
 * @param param0 
 */
function ExtraInformationItem( { className = "", isOwner = false, item } : { item: {icon:LucideIcon, title: "Location" | "Timezone" | "Work hours", value: string }, className?: string, isOwner?: boolean } ) {

    return (
        <>
        {isOwner ? 
            <Dialog>
                <DialogTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={`flex items-center gap-1 px-4 py-2 hover:bg-foreground/5 cursor-pointer rounded-lg ${className}`}>
                                <item.icon size="16px"/>
                                {item.value}
                            </div> 
                        </TooltipTrigger>
                        <TooltipContent> Edit {item.title} </TooltipContent>
                    </Tooltip>
                </DialogTrigger>
                {/* EDIT DIALOGS */}
                {item.title === "Location" && <UpdateLocationDialog/>}
                {item.title === "Timezone" && <UpdateTimezoneDialog/>}
                {item.title === "Work hours" && <UpdateWorkHoursDialog/>}
            </Dialog>
        : 
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className={`flex hover:bg-transparent items-center gap-1 px-4 py-2 ${className}`}>
                        <item.icon size="16px"/>
                        {item.value}
                    </Button>
                </TooltipTrigger>
                <TooltipContent> {item.title} </TooltipContent>
            </Tooltip>
        }
        </>
    )

}