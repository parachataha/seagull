"use client"
import createUserTimeline from "@/actions/user-timelines/createUserTimeline";
import { RootState } from "@/app/redux/store";
import { ModalContent } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/input";
import useServerAction from "@/hooks/useServerAction";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function NewTimelineDialog({

}) {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    /** @const inputError - Used to display an error if the name is already taken */
    const [inputError, setInputError] = useState<string>("");

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);

    const { run, loading, error, success } = useServerAction(() =>
        createUserTimeline({
            name: name.trim(),
            description: description.trim() || undefined,
            userAgent: navigator.userAgent,
        })
    );


    function handleChange(e : any) {
        e.preventDefault()

        setName(e.target.value)

        user.timelines?.forEach(timeline => {
            if (timeline.name.trim().toLowerCase() === e.target.value.trim().toLowerCase()) {
                setInputError("You've already used this name.")
            } else { 
                setInputError("")
            }
        })
    }

    async function handleSubmit(e : FormEvent) {
        e.preventDefault()

        run()
    }
    
    return ( <ModalContent className="h-full">
        <form onSubmit={handleSubmit} className="flex flex-col grow h-full">
            <div className="flex flex-col justify-between gap-8 h-full grow">

                <div>
                    <h3 className="text-xl font-semibold"> 
                        Create your {user.timelines.length === 0 && "first"} timeline 
                    </h3>
                    <p className="mt-1 text-foreground/70">
                        Timelines lets you add new projects and lets people see how you progressed over time.
                    </p>

                    <Label className="mt-3">Timeline name</Label>
                    <Input
                        value={name}
                        onChange={handleChange}
                        placeholder="My first timeline"
                    />
                    <Label className="mt-1">Timeline description</Label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="A cool timeline about my projects"
                    />

                    {inputError && <p className="text-red-500 my-2"> {inputError} </p>}
                </div>

                <div>
                    <Button className="mt-4" variant="neutral"> Create Timeline </Button>
                </div>

            </div>
        </form>
    </ModalContent>
    );
}