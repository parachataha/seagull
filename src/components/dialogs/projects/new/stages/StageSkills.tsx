"use client"

import { RootState } from "@/app/redux/store";
import { PublicSafeUser } from "@/lib/types/User";
import { useDispatch, useSelector } from "react-redux";

export default function StageSkills ( {
    user,

    skills,
    setSkills,

    stage,
    setStage,
} : {
    user: PublicSafeUser,

    skills: string[],
    setSkills: React.Dispatch<React.SetStateAction<string[]>>,

    stage: number,
    setStage: React.Dispatch<React.SetStateAction<number>>,
} ) {

    const dispatch = useDispatch();
    
    return ( <>

        {/* {user.skills.length > 0 && ( 

        )} */}
        
    </>
    );
}