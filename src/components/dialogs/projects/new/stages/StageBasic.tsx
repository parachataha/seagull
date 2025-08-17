"use client"

// Components
import { FileDropzone } from "@/components/ui/files/FileDropzone";
import { Label } from "@/components/ui/input";
import { PublicSafeUser } from "@/lib/types/User";
import { Button, Input, Textarea } from "@once-ui-system/core";
import { Timeline } from "@prisma/client";
import { ArrowLeft, Heading1Icon, PlusIcon, Settings2Icon, TextIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";;

export default function StageBasic ( {
    user,

    timeline,

    title, 
    setTitle,

    locationType,
    setLocationType,

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

    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,

    locationType: string,
    setLocationType: React.Dispatch<React.SetStateAction<string>>,

    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,

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

    const [selectedCountry, setSelectedCountry] = useState("");
    
    return ( <>
        
    <div className="flex gap-2">
        <div className="grow">
            <Label> Title </Label>
            <Input
                id="title"
                aria-invalid={inputErrors.includes("title") ? "true" : "false"}
                placeholder="My cool sunglasses"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
        </div>
    </div>

    <div>
        <Label> Description </Label>
        <Textarea
            id="description"
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
                <Button 
                    variant="secondary"
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="!absolute top-3 left-3"
                >
                    <ArrowLeft className="text-muted-foreground" size="18px"/>
                </Button>
                {/* DELETE BUTTON */}
                <Button 
                    variant="danger"
                    type="button"
                    onClick={() => handleImageDelete(selectedImage)}
                    className="!absolute top-3 right-3 !bg-red-500/10"
                >
                    <Trash2Icon className="text-red-500" size="18px"/>
                </Button>
                {/* IMAGE DESCRIPTION */}
                <Input
                    id="img-description"
                    className="!absolute bottom-0 left-0 w-full !rounded-b-lg !rounded-t-none"
                    label="Optional description"
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
            <div className="rounded-lg flex items-center flex-wrap gap-1 mt-3 bg-popover p-2"> 
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
                    className="h-full !py-7"
                    variant="secondary"
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