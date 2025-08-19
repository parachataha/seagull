"use client"

import { useState } from "react";
import { FileDropzone } from "../../ui/files/FileDropzone";
import { Input, Label, Textarea } from "../../ui/input";
import RichTextEditor from "../../ui/rich-text-editor/RichTextEditor";

/**
 * The form allowing authenticated users to create new documents/articles
 */

export default function CreateDocForm ( {
     
} : {
     
} ) {

    const [files, setFiles] = useState<File[]>([])
    
    return ( <div className="w-full">

        <form className="flex flex-col gap-4">  

            <div>
                <Label>Title</Label>
                <Textarea
                    id="title"
                    placeholder="When Giants Ruled the Earth: Exploring the Lost World of Dinosaurs"
                    className={`
                        font-semibold !text-2xl border-x-0 border-t-0 rounded-none !px-0 !pt-0 resize-none !min-h-0 !h-10
                        border-b-2 border-b-muted !shadow-none
                    `}
                />
            </div>

            <div>
                {/* Thumbnail upload */}
                <Label>Thumbnail</Label>
                <FileDropzone
                    variant="dashed-border"
                    placeholderFileType="thumbnail"
                    files={files}
                    setFiles={setFiles}
                    accept="image"
                />
                <Input
                    id="description"
                    placeholder="Describe your image here"
                    className={`!border-0 !p-0 mt-2 resize-none`}
                />
            </div>

            <div>
                <RichTextEditor />
            </div>

        </form>
        
    </div>
    );
}