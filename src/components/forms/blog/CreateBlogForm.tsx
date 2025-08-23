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
import createBlog from "@/actions/blogs/create/createBlog";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateBlogForm({ 
    className = ""
} : {
    className?: string
}) {

    const router = useRouter();

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
                router.push(`/blogs/${data?.slug}`)
            }
        }
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        run()

    }

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>

            {(error || success) && <div className="my-1">
                {error && <Alert variant="destructive" appearance="outline">
                        <AlertIcon> <AlertCircleIcon /> </AlertIcon>
                        <AlertTitle>{error || "An error occurred"}</AlertTitle>
                </Alert>}
                {success && <Alert variant="success" appearance="outline">
                        <AlertIcon> <CheckIcon /> </AlertIcon>
                        <AlertTitle>{success || "Blog created successfully"}</AlertTitle>
                </Alert>}
            </div>}

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
                        setSlug( e.target.value.trim().replaceAll(" ", "-").toLowerCase() )
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
                    onChange={(e : any) => setDescription(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div>
                <Label>Thumbnail</Label>
                <FileDropzone

                variant="dashed-border"

                files={files}
                setFiles={setFiles}

                descriptions={fileDescriptions}
                setDescriptions={setFileDescriptions}

                accept="image"
                showPreview
                />
            </div>

            {(error || success) && <div className="my-1">
                {error && <Alert variant="destructive" appearance="outline">
                        <AlertIcon> <AlertCircleIcon /> </AlertIcon>
                        <AlertTitle>{error || "An error occurred"}</AlertTitle>
                </Alert>}
                {success && <Alert variant="success" appearance="outline">
                        <AlertIcon> <CheckIcon /> </AlertIcon>
                        <AlertTitle>{success || "Blog created successfully"}</AlertTitle>
                </Alert>}
            </div>}

            <div className="flex pb-3">
                <Button disabled={loading} variant="neutral">
                    {loading && <LoaderCircleIcon className="animate-spin size-4" />}
                    {loading ? "Loading" : "Create Blog"}
                </Button>
            </div>
        </form>
    );
}
