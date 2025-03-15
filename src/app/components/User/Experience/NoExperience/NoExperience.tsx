"use client"
import { useState } from "react";
import styles from "./NoExperience.module.css";
import AddExperience from "@/app/components/ui/Modals/AddExperience/AddExperience";

interface Props {
    className?: string
}

export default function NoExperience( {className} : Props ) {

    const [showAdd, setShowAdd] = useState<boolean>(false)

    return ( <div className={`widget no-border flex flex-col justify-center items-center min-h-[300px] w-full ${className}`}>

        {showAdd && <AddExperience setShow={setShowAdd}/>}
        
        <h4 className='text-xl'> Add your first experience </h4>

        <button className="button pill white mt-2 text-[16px]" onClick={() => setShowAdd(showAdd ? false : true)}> Upload experience </button>

    </div> )

}