"use client"
/**
 * This component is very complex, allowing users to create parent skills
 */

// Types
import { RootState } from "@/app/redux/store";
import { UserSkill } from "@/generated/prisma";

// Components
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Trash2, SquarePlus, CornerDownRight } from "lucide-react"; // Icons

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function ManageSkillsDialog({ className }: { className?: string }) {
    
    /** @const user - Used to fetch user redux states */
    const user = useSelector((state: RootState) => state.user); 
    
    /** @const newSkill - Handles new skill input */
    /** @const newColor - Handles color input */
    const [newSkill, setNewSkill] = useState(""); 
    const [newSkillColor, setNewSkillColor] = useState("#FFFFF"); // Default black

    /** @const allSkills - Handles storing all skills  */
    const [allSkills, setAllSkills] = useState<UserSkill[]>([]);

    /** Updates @const user with initial redux user state */
    useEffect(() => {
        setAllSkills(user.Skills || []);
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
            order: 0,
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
        color: "#555",
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

    return (
        <DialogContent className="max-h-150 overflow-scroll">
            {/* DIALOG HEADER */}
            <DialogHeader>
                <DialogTitle>Manage your skills</DialogTitle>
                <DialogDescription>Here you can add or remove skills, make children skills and more!</DialogDescription>
            </DialogHeader>

            {/* ADD NEW PARENT SKILL */}
            <form onSubmit={addSkill}>
                <div className="flex gap-2">
                    <div className="grow">
                        <Label>New Parent Skill</Label>
                        <Input
                            required
                            className="mb-2"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="UI Design"
                            type="text"
                        />
                    </div>
                    <div>
                        <Label>Skill color</Label>
                        <Input
                            className="mb-2"
                            value={newSkillColor}
                            onChange={(e) => setNewSkillColor(e.target.value)}
                            placeholder="UI Design"
                            type="color"
                        />
                    </div>
                </div>
                <Button variant="neutral" type="submit">Add Parent Skill</Button>
            </form>

            {/* SKILLS EDITOR */}
            <Separator className="my-2" />
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

            {/* SAVE BUTTON */}
            <Separator className="my-2" />
            
            <div className=""> 
                <Button variant="neutral">Save changes</Button>
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
                    <Dialog open={openAddChildDialog}>
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
        setOpen(false)
    }

    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle> Add child skill to {parentSkill.name} </DialogTitle>
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