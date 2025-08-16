"use client"
// Types
import { type RootState } from "@/app/redux/store";
import { type Timeline } from "@prisma/client";

// Components
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StageBasicDetails from "./stages/StageBasicDetails";
import { NeutralProgress, Progress } from "@/components/ui/progress";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StageSkills from "./stages/StageSkills";
import { Button } from "@/components/ui/button";

export default function NewProjectDialog() {

    const [stage, setStage] = useState<number>(1)

    const [timeline, setTimeline] = useState<Timeline | undefined>() // Used to select which timeline the project goes into
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [imageDescriptions, setImageDescriptions] = useState<string[]>([])

    const [skills, setSkills] = useState<string[]>([]); // Skills for the project

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);

    useEffect(() => {
        /**
         * Update the default timeline to the first user's timeline
         */
        console.log(user.timelines)
        if (user.timelines.length > 0) {
            setTimeline(user.timelines[0]);
        }
    }, [user])

    return ( <DialogContent className="!max-w-3xl ">

        <DialogHeader>
            {/* <Progress value={stage * 25} /> */}

            <DialogTitle className="mt-4"> 
                {stage === 1 && "Create Project"}
                {stage === 2 && "Select Skills"}
            </DialogTitle>
            <DialogDescription> 
                {stage === 1 && "Upload images and information about your latest projects"} 
                {stage === 2 && "Select the skills required for this project, you can select none or as many as you like."} 
            </DialogDescription> 
        </DialogHeader>

        <form className="flex flex-col gap-3">

            {stage == 1 && 
                <StageBasicDetails  
                    timeline={timeline}
                    setTimeline={setTimeline}
                    
                    title={title}
                    setTitle={setTitle}

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

            <div className="flex gap-2">
                {stage > 1 && <Button onClick={() => setStage(stage - 1)} type="button" variant="outline"> Back </Button>}  
                {stage < 4 && <Button onClick={() => setStage(stage + 1)} type="button" variant="secondary"> Next </Button>}
            </div>

        </form>

    </DialogContent>
    );
}