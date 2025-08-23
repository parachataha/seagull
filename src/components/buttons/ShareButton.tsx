"use client"

import { Button } from "../ui/button";
import { Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ShareDialog from "../dialogs/docs/ShareDialog";

/**
 * A share button opening a share dialog 
 */

export default function ShareButton ( {
    title = "Check out this new article I just read!",  
    description = "Learn more at Seagull!"
} : {
    title?: string, 
    description?: string
} ) {

    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        // Only runs client-side
        setUrl(window.location.href);
    }, []);
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="neutral" 
                    appearance="ghost"
                    mode="icon"
                > 
                    <Share2Icon/>
                </Button>
            </DialogTrigger>
            <ShareDialog    
                title={title}
                description={description}
                url={url}
            />
        </Dialog>
    );
}