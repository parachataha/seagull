
/**
 * Used to display a single skill
 */

import { cn } from "@/lib/utils";
import { UserSkill } from "@prisma/client";

export default function Skill( { 
    className = "",
    skill
} : { 
    className?: string,
    skill: UserSkill,
} ) {
    
    return ( <div 
        className={cn(className, `px-2 py-1 rounded-3xl text-sm border ${skill.parentId && "opacity-70"}`)}
        style={{ color: skill.color, borderColor: skill.color }}
    >
        
        {skill.name}

    </div>
    );
}