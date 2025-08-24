"use client"
// Server actions
import createDoc from "@/actions/docs/create/createDoc";

// Components
import { FileDropzone } from "../../ui/files/FileDropzone";
import { Input, Label, Textarea } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PublishDocDialog from "@/components/dialogs/docs/PublishDocDialog";
import RichTextEditor from "../../ui/rich-text-editor/RichTextEditor";

// Icons
import { GlobeIcon, SaveIcon } from "lucide-react";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useServerAction from "@/hooks/useServerAction";

// Hooks
import { useSelector } from "react-redux";

// Types
import { JSONContent } from "@tiptap/react";
import { DocWithThumbnailAndBlogBasics } from "@/lib/types/Blog";
import { RootState } from "@/app/redux/store";
import Image from "next/image";

/**
 * The form allowing authenticated users to create new documents/articles
 */

export default function EditDocForm ( {
    blogSlug,
    docSlug,
    author,
    doc
} : {
    blogSlug: string,
    docSlug: string,
    author: { name: string | null, slug: string | null },
    doc: DocWithThumbnailAndBlogBasics,
} ) {
    
    const user = useSelector((state : RootState) => state.user);
    const router = useRouter();

    /**
     * Ensure user owns doc
     */
    useEffect(() => {
        if (user.slug) {
            if (user.slug?.toLowerCase() !== author.slug?.toLowerCase()) router.push("./")
        }
    }, [user.slug])
    
    const [files, setFiles] = useState<File[]>([])
    
    const [title, setTitle] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [imageDescription, setImageDescription] = useState<string>("")
    const [body, setBody] = useState<JSONContent | undefined>()
    
    const [isPublic, setIsPublic] = useState<boolean>(false)

    /**
     * Update values with database values
     */
    useEffect(() => {
        console.log(body?.generateHTML())
        setTitle(doc.title);
        setSlug(doc.slug);
        setBody(doc.body as JSONContent);
        setImageDescription(doc?.thumbnail?.description || "");
    }, [doc])


    const { run, loading, error, success } = useServerAction(() =>
        createDoc({
            userAgent: navigator.userAgent,

            title: title.trim(),
            body: body as JSONContent,
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
                {doc?.thumbnail?.url && <Image
                    src={doc.thumbnail.url || ""}
                    alt={doc.thumbnail?.description || ""}
                    width={200}
                    height={160}
                    className="w-full object-container rounded-2xl"
                />}
                <Input
                    required
                    value={imageDescription}
                    onChange={e => setImageDescription(e.target.value)}
                    id="description"
                    placeholder="Describe your image here"
                    className={`!border-0 mt-2 resize-none bg-muted`}
                />
            </div>

            <div>
                <RichTextEditor 
                    data={body as JSONContent}
                    setData={setBody}
                    defaultContent={`${body?.generateHTML()}`}
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