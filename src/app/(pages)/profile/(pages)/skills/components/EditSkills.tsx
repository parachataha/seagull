"use client"
import { RootState } from "@/app/redux/store";
import ManageSkillsDialog from "@/components/dialogs/user/skills/ManageSkills";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useSelector } from "react-redux";

export default function EditSkills( { className = "" } : { className?: string } ) {
    
    const user = useSelector((state: RootState) => state.user)

    return ( <Card className={`bg-popover ${className}`}> 
        
        <CardContent>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="neutral"> Add {user.Skills?.length === 0 && "First"} skill </Button>
                </DialogTrigger>
                <ManageSkillsDialog />
            </Dialog>
            
        </CardContent>

    </Card>
    );
}