"use client"

import { RootState } from "@/app/redux/store";
import Skill from "@/components/ui/Skill";
import { PublicSafeUser } from "@/lib/types/User";
import { Button } from "@once-ui-system/core";
import { useDispatch, useSelector } from "react-redux";

export default function StageSkills ( {
    user,

    skills,
    setSkills,

    stage,
    setStage,
} : {
    user: PublicSafeUser,

    skills: number[],
    setSkills: React.Dispatch<React.SetStateAction<number[]>>,

    stage: number,
    setStage: React.Dispatch<React.SetStateAction<number>>,
} ) {

    const dispatch = useDispatch();
    
    return ( <>

        {user.skills.length > 0 && 
            <div className="flex flex-wrap gap-1"> 
                {user.skills.map(value => (
                    <Button
                        key={value.id}
                        type="button"
                        variant="tertiary"
                        className={`
                            !px-0.5
                            !py-0.5
                            ${skills.includes(value.id) && "!bg-foreground/5"}
                        `}
                        onClick={() => {
                            if (skills.includes(value.id)) {
                                setSkills( skills.filter(skill => skill !== value.id) )
                            } else {
                                setSkills( [ ...skills, value.id ] )
                            }
                        }}
                    >
                        <Skill skill={value}/>
                    </Button>
                ))}
            </div>
        }
        
    </>
    );
}