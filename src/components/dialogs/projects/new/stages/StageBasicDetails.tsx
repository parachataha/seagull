"use client"

// Components
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/files/FileDropzone";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { PublicSafeUser } from "@/lib/types/User";
import { Timeline } from "@prisma/client";
import { ArrowLeft, PlusIcon, Settings2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";;

export default function StageBasicDetails ( {
    user,

    timeline,
    setTimeline,

    title, 
    setTitle,

    description,
    setDescription,
    
    files,
    setFiles,

    imageDescriptions,
    setImageDescriptions,

    stage,
    setStage
} : {
    user: PublicSafeUser,

    timeline: Timeline | undefined,
    setTimeline: (arg: Timeline) => void,

    title: string,
    setTitle: (arg: string) => void,

    description: string,
    setDescription: (arg: string) => void,

    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,

    imageDescriptions: string[],
    setImageDescriptions: React.Dispatch<React.SetStateAction<string[]>>,

    stage: number,
    setStage: React.Dispatch<React.SetStateAction<number>>,
} ) {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    /**
     * @function handleImageDelete - Deletes an image from the files and imageDescriptions state
     * This function removes the specified file from the files state and its corresponding description from the imageDescriptions state.
     * It is used to delete an image that has been uploaded.
     * @param file 
     */
    function handleImageDelete(file: File) { 
        setFiles((prev) => prev.filter((f) => f.name !== file.name));
        setImageDescriptions((prev) => prev.filter((_, index) => index !== files.indexOf(file)));
        setSelectedImage(null);
    }

    /**
     * @function handleImageDescriptionChange - Updates the description of an image
     * This function updates the description of an image in the imageDescriptions state.
     * @param e 
     * @param index 
     */
    function handleImageDescriptionChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const newDescriptions = [...imageDescriptions];
        newDescriptions[index] = e.target.value;
        setImageDescriptions(newDescriptions);
    }

    const [inputErrors, setInputErrors] = useState<string[]>([]);
    
    return ( <>
        
    <div className="flex gap-2">
        <div>
            <Label> Timeline* </Label>
            <Select 
                value={timeline?.name}
                onValueChange={(value) => {
                    const selectedTimeline = user.timelines.find(t => t.name === value);
                    if (selectedTimeline) {
                        setTimeline(selectedTimeline);
                        setInputErrors((prev) => prev.filter(err => err !== "timeline"));
                    } else {
                        setInputErrors((prev) => [...prev, "timeline"]);
                    }
                }}
            >
                <SelectTrigger> {timeline ? <span className="text-foreground"> {timeline.name} </span> : "You have no timelines yet"} </SelectTrigger>
                <SelectContent>
                    {user.timelines.map((timeline : Timeline) => {
                        return ( 
                            <SelectItem
                                onClick={() => setTimeline(timeline)}
                                key={timeline.id}
                                value={timeline.name}
                                className="capitalize"
                            >  
                                {timeline.name}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
        <div className="grow">
            <Label> Project Title* </Label>
            <Input 
                aria-invalid={inputErrors.includes("title") ? "true" : "false"}
                placeholder="My cool sunglasses"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    </div>

    <div>
        <Label> Project Description* </Label>
        <Textarea
            aria-invalid={inputErrors.includes("description") ? "true" : "false"}
            placeholder="My cool sunglasses"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>

    <div>
        <Label> Images </Label>
        {selectedImage ? 
        
            <div className="relative w-full h-60 bg-popover rounded-lg overflow-hidden"> 
                {/* DISPLAY IMAGE */}
                <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt={selectedImage.name}
                    width={1000}
                    height={600}
                    className="object-contain w-full h-full"
                />
                {/* BACK BUTTON */}
                <button 
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="cursor-pointer absolute top-3 left-3 bg-background/50 p-2 rounded-md hover:bg-background/80 backdrop-blur-md transition-all duration-300"
                >
                    <ArrowLeft className="text-muted-foreground" size="18px"/>
                </button>
                {/* DELETE BUTTON */}
                <button 
                    type="button"
                    onClick={() => handleImageDelete(selectedImage)}
                    className="cursor-pointer absolute top-3 right-3 bg-red-500/30 p-2 rounded-md hover:bg-red-500/50 backdrop-blur-md transition-all duration-300"
                >
                    <Trash2Icon className="text-red-500" size="18px"/>
                </button>
                {/* IMAGE DESCRIPTION */}
                <Input
                    className="absolute bottom-0 left-0 w-full bg-background/80 backdrop-blur-md border-none py-1 px-2 rounded-b-lg rounded-t-none"
                    placeholder="Describe this image here if you want to"
                    onChange={(e) => handleImageDescriptionChange(e, files.indexOf(selectedImage))}
                    value={imageDescriptions[files.indexOf(selectedImage)] || ""}
                />
            </div>
        :
            <FileDropzone
                showPreview={false}
                multiple
                files={files}
                setFiles={setFiles}
                accept="image"
            />
        }

        {files.length > 0 && 
            <div className="rounded-lg flex items-center flex-wrap gap-0 mt-3 bg-popover p-2"> 
                {files.map((file, index) => {

                    return (
                        <button 
                            type="button"
                            onClick={() => setSelectedImage(file)}
                            key={file.name}
                            className="cursor-pointer rounded-md h-17 group relative p-1 hover:bg-foreground/5 transition-all duration-500"
                        >
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={100}
                                height={100} 
                                className={`
                                    border-2
                                    rounded-md h-full w-full object-contain group-hover:brightness-50 transition-all duration-500
                                    ${selectedImage?.name === file.name ? "border-foreground" : "border-transparent"}
                                    `}
                            />
                            <Settings2Icon className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </button>
                    )
                })} 
                
                {selectedImage && 
                <Button 
                    className="flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 m-1 h-13 px-2"
                    variant="ghost"
                    onClick={() => setSelectedImage(null)}
                    type="button"
                >
                    <PlusIcon className="mr-1" size={16} />
                </Button> 
                }

            </div>
        }

    </div>

    </>
    );
}