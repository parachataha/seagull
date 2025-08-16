"use client"
// Types
import { RootState } from "@/app/redux/store";
import { UserSkill } from "@prisma/client";

// Components
import Skill from "@/components/ui/Skill";
import ManageSkillsDialog from "@/components/dialogs/skills/ManageSkills";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sortSkills from "@/lib/skills/sortSkills";
import { Label } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export default function EditSkills( { 
    className = "", 
    advancedMode,
    setAdvancedMode
} : { 
    className?: string,
    advancedMode: boolean,
    setAdvancedMode: (arg: boolean) => void
} ) {
    
    const user = useSelector((state: RootState) => state.user)

    const [skills, setSkills] = useState<UserSkill[]>([])

    useEffect(() => {
        /** 
         * Set @const skills to updated redux state
         */
        setSkills( sortSkills(user?.skills || []) )
    }, [user])

    return ( <Card className={`bg-popover ${className}`}> 
        
        <CardContent>

            {skills.length > 0 && <div className="mb-3 flex flex-wrap gap-2 items-end">

                {skills?.map(skill => ( 
                    <Skill key={skill.id} skill={skill} />
                ))}

            </div>}
            
            <div className="flex justify-between items-center gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant={skills.length > 0 ? "secondary" : "neutral"}
                            className="!text-sm !py-0 gap-1"
                        >  
                            {skills.length > 0 ? "Edit Skills" : "Add First Skill"}  
                        </Button>
                    </DialogTrigger>
                    <ManageSkillsDialog 
                        advancedMode={advancedMode}
                        setAdvancedMode={setAdvancedMode}
                    />
                </Dialog>
                
                <div className="flex items-center">
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                    <Switch checked={advancedMode} onCheckedChange={() => setAdvancedMode(!advancedMode)} id="advanced-mode"/>
                </div>
            </div>
            
        </CardContent>

    </Card>
    );
}