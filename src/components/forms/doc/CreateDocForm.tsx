"use client"

import { FormEventHandler, useEffect, useState } from "react";
import { FileDropzone } from "../../ui/files/FileDropzone";
import { Input, Label, Textarea } from "../../ui/input";
import RichTextEditor from "../../ui/rich-text-editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { GlobeIcon, SaveIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PublishDocDialog from "@/components/dialogs/docs/PublishDocDialog";
import { useRouter } from "next/navigation";
import useServerAction from "@/hooks/useServerAction";
import createDoc from "@/actions/docs/create/createDoc";

/**
 * The form allowing authenticated users to create new documents/articles
 */

export default function CreateDocForm ( {
    blogSlug
} : {
    blogSlug: string
} ) {

    const router = useRouter();

    const [files, setFiles] = useState<File[]>([])

    const [title, setTitle] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [imageDescription, setImageDescription] = useState<string>("")
    const [body, setBody] = useState<JSON | undefined>()

    const [isPublic, setIsPublic] = useState<boolean>(false)

    const { run, loading, error, success } = useServerAction(() =>
        createDoc({
            userAgent: navigator.userAgent,

            title: title.trim(),
            body: body,
            blogSlug: blogSlug.trim(),
            slug: slug.trim().replaceAll(" ", "-").toLowerCase(),
            
            thumbnail: files[0],
            thumbnailDesc: imageDescription,

            isPublic: isPublic,
        }),
    {
        onSuccess: (data) => router.push(`/blogs/${blogSlug}/${data?.doc.slug}`),
    });

    async function handlePublish() {
        console.log("Woo")
        run()
    }

    async function handleSaveAsDraft() {
        run()
        router.push("/profile/blogs/")
    }
    
    return ( <div className="w-full">

        <form className="flex flex-col gap-4" >  

            <div>
                <Label>Title</Label>
                <Textarea
                    required
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value)
                        setSlug(e.target.value.trim().replaceAll(" ", "-").toLowerCase())
                    }}
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
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    id="description"
                    placeholder="Describe your image here"
                    className={`!border-0 mt-2 resize-none bg-muted`}
                />
            </div>

            <div>
                <RichTextEditor 
                    data={body}
                    setData={setBody}
                />
            </div>
            
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="button" variant="neutral"> 
                            <GlobeIcon/>
                            Publish now
                        </Button>
                    </DialogTrigger>
                    <PublishDocDialog 
                        loading={loading}
                        success={success}
                        error={error}
                        
                        slug={slug}
                        setSlug={setSlug}
                        handleSubmit={handlePublish} 
                    />
                </Dialog>
                <Button type="button" variant="outline"> 
                    <SaveIcon/>
                    Save as draft
                </Button>
            </div>

        </form>
        
    </div>
    );
}