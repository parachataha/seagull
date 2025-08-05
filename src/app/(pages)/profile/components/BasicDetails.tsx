"use client"

// Types
import { RootState } from "@/app/redux/store";
import UpdateLabelDialog from "@/components/dialogs/user/edit/UpdateLabel";
import UpdateNameDialog from "@/components/dialogs/user/edit/UpdateName";

// Components
import ColorBanner from "@/components/images/ColorBanner";
import UserAvatar from "@/components/images/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PenBoxIcon, PencilIcon } from "lucide-react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function BasicDetails() {

    const dispatch = useDispatch()
    const user = useSelector((state : RootState) => state.user);
    
    return (
        <Card className="bg-popover p-0 overflow-hidden relative pb-6 border-0 shadow-none">
            <div className="flex flex-col gap-4">

                <ColorBanner className="h-20" imageURL={user.avatar?.url} />

                <CardContent className="flex items-end gap-3 px-3 relative">
                    <div className="absolute bottom-[-15%] rounded-full border-popover border-3">
                        <UserAvatar
                            className="h-28 w-28"
                            src={user.avatar?.url}
                            name={user.name}
                        />
                    </div>
                    <div className="ml-32 flex flex-col grow">
                        {/* EDIT NAME */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl capitalize font-semibold"> {user.name} </h1>
                            {/* <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost"> <PenBoxIcon size="8px"/> </Button>
                                </DialogTrigger>
                                <UpdateNameDialog />
                            </Dialog> */}
                        </div>
                        
                        {/* EDIT LABEL */}
                        <div className="flex justify-between items-center">
                            <p className="text-foreground/60 text-lg"> {user.label ?? "You do not have a label yet"} </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost"> <PenBoxIcon size="8px"/> </Button>
                                </DialogTrigger>
                                <UpdateLabelDialog />
                            </Dialog>
                        </div>
                    </div>

                </CardContent>

            </div>
        </Card>
    );
}