"use client"
// Types
import { type RootState } from "@/app/redux/store";
import { type Timeline } from "@prisma/client";

// Components
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button, DateRange } from "@once-ui-system/core";
import StageSkills from "./stages/StageSkills";
import StageBasic from "./stages/StageBasic";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StageMoreInfo from "./stages/StageMoreInfo";

export default function NewProjectDialog( {
    timeline
} : {
    timeline : Timeline
} ) {

    const [stage, setStage] = useState<number>(1);

    // Stage 1
    const [title, setTitle] = useState<string>("");
    const [locationType, setLocationType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [imageDescriptions, setImageDescriptions] = useState<string[]>([]);

    // Stage 2
    const [skills, setSkills] = useState<number[]>([]); // Skill IDs for the project

    // Stage 3
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date()
    });

    const [projectUrl, setProjectUrl] = useState<string>("");

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    return ( <DialogContent className="!max-w-3xl ">

        <DialogHeader>
            {/* <Progress value={stage * 25} /> */}

            <DialogTitle className="mt-4"> 
                {stage === 1 && "Create Project"}
                {stage === 2 && "Select Skills"}
                {stage === 3 && "Work information"}
            </DialogTitle>
            <DialogDescription> 
                {stage === 1 && "Upload images and information about your latest projects"} 
                {stage === 2 && "Let people know what skills you used, you can select none or as many as you like."} 
                {stage === 3 && "Provide details about the project dates and your work types"} 
            </DialogDescription> 
        </DialogHeader>

        <form className="flex flex-col gap-3">

            {stage == 1 && 
                <StageBasic  
                    timeline={timeline}
                    
                    title={title}
                    setTitle={setTitle}

                    locationType={locationType}
                    setLocationType={setLocationType}

                    description={description}
                    setDescription={setDescription}
                    
                    setFiles={setFiles}
                    files={files}

                    imageDescriptions={imageDescriptions}
                    setImageDescriptions={setImageDescriptions}

                    stage={stage}
                    setStage={setStage}
                    
                    user={user}
                />
            }

            {stage == 2 && 
                <StageSkills  
                    skills={skills}
                    setSkills={setSkills}
                    stage={stage}
                    setStage={setStage}
                    
                    user={user}
                />
            }

            {stage === 3 && (
            <StageMoreInfo
                user={user}
                dateRange={dateRange}
                setDateRange={setDateRange}
                projectUrl={projectUrl}
                setProjectUrl={setProjectUrl}
                locationType={locationType}
                setLocationType={setLocationType}
            />
            )}


            <div className="flex gap-2">
                {stage > 1 && <Button variant="secondary" onClick={() => setStage(stage - 1)} type="button"> Back </Button>}  
                {stage < 4 && <Button variant="primary" onClick={() => setStage(stage + 1)} type="button"> Next </Button>}
            </div>

        </form>

    </DialogContent>
    );
}