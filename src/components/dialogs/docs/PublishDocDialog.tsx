"use client"

import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input, InputAddon, InputGroup, Label } from "@/components/ui/input";
import { AlertCircleIcon, CheckIcon, LoaderCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublishDocDialog ( {
    handleSubmit,

    slug,
    setSlug,

    success, 
    error,
    loading = false,
} : {
    handleSubmit: () => void;
    /** Allow user to customize slug */
    slug: string;
    setSlug: React.Dispatch<React.SetStateAction<string>>;
    /** Handle success, error and loading states */
    success: string | null,  
    error: string | null,
    loading: boolean,
} ) {

    const [stage, setStage] = useState<(1 | 2)>(1);
    const pathname = usePathname()

    const blogName = pathname.split("/")[2] || "blog"

    // Move to next stage if loading is complete and successful
    useEffect(() => {
        if (!loading && success) {
            setTimeout(() => {
                setStage(2)
            }, 500)
        }
    }, [loading, success])
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle> {stage === 1 ? "Publish your master piece!" : "Your article is now published!"} </DialogTitle>
            <DialogDescription> 
                {stage === 1 ? 
                    "Showcase to the world your hard work" 
                : 
                    "You're all set! Why not share your creation with the world?"} 
            </DialogDescription>

        </DialogHeader>
        {stage === 1 && <div>
            
            <Label>Setup your URL</Label>
            <InputGroup>
                <InputAddon> {blogName || "blog"} </InputAddon>
                <Input
                    placeholder="my-awesome-blog-url"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.trim().replaceAll(" ", "").toLowerCase())}
                />
            </InputGroup>

            {<div className="mt-3">
                {error && <Alert variant="destructive" appearance="outline">
                    <AlertIcon> <AlertCircleIcon /> </AlertIcon>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>}
                {success && <Alert variant="success" appearance="outline">
                    <AlertIcon> <CheckIcon /> </AlertIcon>
                    <AlertTitle>{success}</AlertTitle>
                </Alert>}
            </div>}

            <Button 
                onClick={() => {
                    console.log("Clicked Publish");
                    handleSubmit();
                }} 
                disabled={loading} variant="neutral" className="mt-3">
                {loading && <LoaderCircleIcon className="animate-spin size-4" />}
                {loading ? "Loading" : "Publish"}
            </Button>

        </div>}
        
    </DialogContent>
    );
}