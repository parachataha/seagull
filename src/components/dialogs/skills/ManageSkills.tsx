"use client"
/**
 * This component is complex, allowing users to create parent skills
 */

// Data
import { ColorName } from "@/lib/data/colors"; // Used to map all color choices

// Types
import { RootState } from "@/app/redux/store";
import { UserSkill } from "@prisma/client";

// Components
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Trash2, SquarePlus, CornerDownRight } from "lucide-react"; // Icons
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Skill from "@/components/ui/Skill";

// Hooks
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Server actions
import updateSkills from "@/actions/user/update/skills/skills";
import useServerAction from "@/hooks/useServerAction";

export default function ManageSkillsDialog({ 
    className,
    advancedMode,
    setAdvancedMode,
} : { 
    className?: string,
    advancedMode: boolean,
    setAdvancedMode: (arg: boolean) => void,
}) {

    const { run, loading, error, success } = useServerAction(() => updateSkills({
        oldValues: user.skills,
        newValues: allSkills,
        userAgent: navigator.userAgent,
        }), 
        {
            unauthorizedRedirectUrl: "/login",
            noSuccessToast: false,
        }
    );

    /** @const user - Used to fetch user redux states */
    const user = useSelector((state: RootState) => state.user); 
    
    /** @const newSkill - Handles new skill input */
    /** @const newColor - Handles color input */
    const [newSkill, setNewSkill] = useState(""); 
    const [newSkillColor, setNewSkillColor] = useState<ColorName>("foreground"); // Default foreground

    /** @const allSkills - Handles storing all skills  */
    const [allSkills, setAllSkills] = useState<UserSkill[]>([]);

    /** Updates @const user with initial redux user state */
    useEffect(() => {
        setAllSkills(user.skills || []);
    }, [user]);

    /**
     * @function addSkill - Handles adding a parent skill
     */
    const addSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return; // Return if empty

        const newSkillObj: UserSkill = {
            userId: user.id,
            id: Math.random(), // temp id
            name: newSkill,
            parentId: null,
            color: newSkillColor,
            order: allSkills.length + 1,
            createdAt: Math.floor(new Date().getTime() / 1000),
        };

        setAllSkills(prev => [...prev, newSkillObj]);
        setNewSkill("");
    };

    /**
     * @function addChildSkill - Show popup to user to input a new child skill value
     * @param parentId - Number ID of existing parent
     */
    const addChildSkill = (value: string, parentId: number) => {
        
        if (!value) return;

        const childSkill: UserSkill = {
        userId: user.id,
        id: Math.random(), // temp id
        name: value,
        parentId,
        color: allSkills.find(skill => skill.id === parentId)?.color || "#FFF",
        order: 0,
        createdAt: Math.floor(new Date().getTime() / 1000),
        };

        setAllSkills(prev => [...prev, childSkill]);
    };

    const deleteSkill = (id: number) => {
        setAllSkills(prev => prev.filter(skill => skill.id !== id && skill.parentId !== id));
    };

    /** @const topLevelSkills - All parent skills */
    /** @const childSkills - All child skills */
    const topLevelSkills = allSkills.filter(skill => !skill.parentId);
    const childSkills = (parentId: number) =>
        allSkills.filter(skill => skill.parentId === parentId);

    /** 
     * @function handleSubmit - handles updating the database 
    */
    async function handleSubmit(e : any) {
        
        e.preventDefault()

        run()

    }

    return (
        <DialogContent className="max-h-150 overflow-scroll">
            {/* DIALOG HEADER */}
            <DialogHeader>
                <DialogTitle>Manage your skills</DialogTitle>
                <DialogDescription className="mt-2">Here you can add or remove skills, make children skills and more!</DialogDescription>
            </DialogHeader>

            {/* ADD NEW PARENT SKILL */}
            <form onSubmit={addSkill}>
                <div className="flex flex-col gap-2 mb-4">
                    <div>
                        <Label>New {advancedMode && "Parent"} Skill</Label>
                        <Input
                            required
                            className="mb-2"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="UI Design"
                            type="text"
                        />
                    </div>
                </div>
                <Button variant="neutral" type="submit">Add {advancedMode && "Parent"} Skill</Button>
            </form>

            {/* SKILLS EDITOR FOR ADVANCED AND NORMAL MODE */}
            <Separator className="my-2" />
            {advancedMode ? 
                <div className="flex flex-col gap-1">
                    {allSkills.length > 0 && <div> 
                        <Label> Skills Editor </Label>
                        <DialogDescription> You can add child skills and change the overall skill color </DialogDescription>    
                     </div>}
                    
                    <div className="mt-2 flex flex-wrap gap-2">

                        {/* LIST ALL PARENT SKILLS */}
                        {topLevelSkills.length > 0 ? 
                            <>
                                {/* All skills */}
                                {topLevelSkills.map((skill : UserSkill) => (
                                    <EditableSkill 
                                        key={skill.id}
                                        skill={skill}
                                        childSkills={childSkills}
                                        addChildSkill={addChildSkill}
                                        deleteSkill={deleteSkill}
                                    />
                                ))}
                            </>
                        :   
                            <>
                                {/* Display tip message if no tags */}
                                <p> Added skills will appear here. Once added, you can customize the color and add child skills </p>    
                            </>
                        }
                    </div>
                </div>
            :
                <div>
                    <div className="flex flex-col gap-1">
                        {allSkills.length > 0 && <div> 
                            <Label> Skills Preview </Label>
                            <DialogDescription> You can preview how skills will look over here. Click a skill to remove it </DialogDescription>    
                     </div>}
                    <div className="mt-2 flex flex-wrap gap-0.5">

                        {/* LIST ALL PARENT SKILLS */}
                        {allSkills.length > 0 ? 
                            <>
                                {/* All skills */}
                                {allSkills.map((skill : UserSkill) => (
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => deleteSkill(skill.id)}
                                        key={skill.id}
                                        className="px-1 py-2"
                                    > 
                                        <Skill 
                                            skill={skill}
                                        />
                                    </Button>
                                ))}
                            </>
                        :   
                            <>
                                {/* Display tip message if no tags */}
                                <p> Added skills will appear here. Once added, you can preview how they will look here </p>    
                            </>
                        }
                    </div>
                    </div>
                </div>
            }

            {/* SAVE BUTTON */}
            <Separator className="my-2" />
            
            <div className=""> 
                <Button type="button" onClick={handleSubmit} variant="neutral">Save changes</Button>
            </div>

        </DialogContent>
    );
}

/**
 * @function ParentSkill - Used to display each skills AND its children
 */
export function EditableSkill({ 
    skill, 
    childSkills,
    addChildSkill,
    deleteSkill
} : { 
    skill: UserSkill, 
    childSkills: (parentId: number) => UserSkill[],
    addChildSkill: (value: string, parentId: number) => void,
    deleteSkill: (id: number) => void,
}) {

    const [openAddChildDialog, setOpenAddChildDialog] = useState<boolean>(false)

    return ( 
        <div className={`border px-3 py-1 rounded-lg`} style={{ color: skill.color }}>
            <div className="flex justify-between items-center gap-5">
                {/* SKILL NAME */}
                <div className="font-semibold">{skill.name}</div>
                {/* MANAGE SKILL BUTTONS */}
                <div className="flex gap-1">
                    <Dialog onOpenChange={setOpenAddChildDialog} open={openAddChildDialog}>
                        <DialogTrigger asChild onClick={() => setOpenAddChildDialog(true)}>
                            <Button
                                className="!px-0.5"
                                size="sm"
                                variant="ghost"
                            >
                                <SquarePlus size="12px" />
                            </Button>
                        </DialogTrigger>
                        {/* DIALOG TO CREATE NEW CHILD SKILL */}
                        <AddChildSkillDialog
                            setOpen={setOpenAddChildDialog}
                            parentSkill={skill}
                            addChildSkill={addChildSkill}
                        />
                    </Dialog>
                    <Button
                        className="!px-0.5"
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSkill(skill.id)}
                    >
                        <Trash2 size="12px" className="text-red-500" />
                    </Button>
                </div>
            </div>

            {/* LIST ALL CHILD SKILLS FOR PARENT */}
            {childSkills(skill.id).length > 0 &&
                <div className="ml-4 mt-2 flex flex-col">
                    {childSkills(skill.id).map(child => (
                    <div key={child.id} className="w-full flex justify-between text-sm opacity-70">
                            <span className="flex gap-1 items-center"> 
                                <CornerDownRight size="12px" className="opacity-70" /> 
                                {child.name}
                            </span>
                            <Button
                                className="px-1"
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteSkill(child.id)}
                            >
                            <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                    </div>
                    ))}
                </div>
            }
        </div>
    )
}

/**
 * @function AddChildSkillDialog() - Displayed on top when to add a new child skill
 */
export function AddChildSkillDialog({
    parentSkill,
    addChildSkill,
    setOpen,
} : {
    parentSkill : UserSkill,
    addChildSkill: (value: string, parentId: number) => void,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {

    const [newChild, setNewChild] = useState<string>("")

    function handleSubmit(e : React.FormEvent) {
        e.preventDefault()
        addChildSkill(newChild, parentSkill.id)
        setNewChild("")
        setOpen(false)
    }

    return ( <DialogContent>

        <DialogClose onClick={() => setOpen(false)} />

        <DialogHeader>
            <DialogTitle> Add child skill to <span style={{ color: parentSkill.color }}> {parentSkill.name}  </span> </DialogTitle>
            <DialogDescription> This skill will adopt the color of its parent with a lower opacity </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>

            <Input 
                value={newChild}
                onChange={(e) => setNewChild(e.target.value)}
                type="text"
                placeholder="Powerpoint"
            />

            <Button 
                variant="neutral"
                className="mt-2"
                type='submit'
            > 
                Add Child 
            </Button>

        </form>

    </DialogContent> )
}