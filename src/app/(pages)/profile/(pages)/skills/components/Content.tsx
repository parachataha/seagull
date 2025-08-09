"use client"
import { useEffect, useState } from "react";
import EditSkills from "./EditSkills";
import SkillsInfo from "./SkillsInfo";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function Content() {

    const user = useSelector((state: RootState) => state.user)
    const [advancedMode, setAdvancedMode] = useState<boolean>(false)

    useEffect(() => {
        /**
         * Check if advanced mode should be enabled
         */
        (user?.Skills || []).forEach(skill => { if (skill.parentId) setAdvancedMode(true) })
    }, [user])
    
    return ( <>

        {/* HELPFUL INFORMATION */}
        <SkillsInfo advancedMode={advancedMode}/>

        <EditSkills advancedMode={advancedMode} setAdvancedMode={setAdvancedMode}/>
        
    </>
    );
}