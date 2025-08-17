"use client";

// Components
import { FileDropzone } from "@/components/ui/files/FileDropzone";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types
import { Doc } from "@prisma/client";
import { RootState } from "@/app/redux/store"

// Hooks
import { useSelector } from "react-redux";
import { useState } from "react";

// Server actions
import useServerAction from "@/hooks/useServerAction";
import uploadImage from "@/actions/files/uploadImage"
import createBlog from "@/actions/blogs/createBlog";

export default function CreateForm({ 
    className = ""
} : {
    className?: string
}) {

    const user = useSelector((state : RootState) => state.user);

    // Form states
    const [slug, setSlug] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [userId, setUserId] = useState<number | null>(null);
    const [teamId, setTeamId] = useState<number | null>(null);
    const [organizationId, setOrganizationId] = useState<number | null>(null);

    const [files, setFiles] = useState<File[]>([]);
    const [fileDescriptions, setFileDescriptions] = useState<string[]>([]);

    const [pinnedDocId, setPinnedDocId] = useState<number | null>(null);
    const [docs, setDocs] = useState<Doc[]>([]);
    const [createdAt, setCreatedAt] = useState<number>(Math.floor(Date.now() / 1000));
    const [updatedAt, setUpdatedAt] = useState<number | null>(null);

    const { run, loading, error, success } = useServerAction(() => 
        createBlog({
            userAgent: navigator.userAgent || null,
            thumbnail: files[0],
            description: description.trim(),
            slug: slug.trim().replaceAll(" ", "").toLowerCase(),
            title: title.trim(),
        }),
        {
            onSuccess: (data) => {
                console.log(data)
            }
        }
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        run()

    }

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>

            <div>
                <Label>Title</Label>
                <Input
                    required
                    id="title"
                    placeholder="All About Dinosaurs"
                    value={title}
                    disabled={loading}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug( e.target.value.replaceAll(" ", "-").toLowerCase() )
                    }}
                />
            </div>

            <div>
                <Label>URL</Label>
                <Input
                    required
                    id="slug"
                    placeholder="all-about-dinosaurs"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={loading}
                />    
            </div>


            <div>
                <Label>Description</Label>
                <Textarea
                    id="description"
                    placeholder="Write a short description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div>
                <Label>Thumbnail</Label>
                <FileDropzone

                files={files}
                setFiles={setFiles}

                descriptions={fileDescriptions}
                setDescriptions={setFileDescriptions}

                accept="image"
                showPreview
                />
            </div>

            {error || success && <div className="my-2">
                {error && <p className="text-red-500"> error: {error} </p>}
                {success && <p className="text-green-500"> {success} </p>}
            </div>}

            <div className="flex mt-1">
                <Button 
                    variant="neutral" 
                    type="submit"
                    disabled={loading}
                >
                    Create Blog
                </Button>
            </div>
        </form>
    );
}
