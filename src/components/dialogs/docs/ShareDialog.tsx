"use client"

/**
 * Standalone dialog that gives the ability for anyone to share the doc
 * @param url - The current URL
 */

import CopyLinkButton from "@/components/buttons/CopyLinkButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input, InputAddon, InputGroup, Label } from "@/components/ui/input";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { EmailIcon, EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"

export default function ShareDialog ( {
    url = "www.seagull-app.vercel.app",
    title = "Check out this new article I just read!",  
    description = "Learn more at Seagull!"
} : {
    url: string;
    title?: string;
    description?: string;
} ) {

    const [copied, setCopied] = useState(false);

    function handleCopyURL() {
        if (!url) return;
        setCopied(true);
        navigator.clipboard.writeText(url);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle> Share this page </DialogTitle>
            <DialogDescription>
                Easily share this page with others using social media or by copying the link below.
            </DialogDescription>
        </DialogHeader>

        <div className="">

            <Label>Social media</Label>
            <div className="flex items-stretch gap-2 p-2 bg-muted/80 mb-3 border border-input rounded-md">
                <EmailShareButton url={url} body={description} subject={title} className="rounded aspect-square !p-2 !bg-destructive/50">  
                    <MailIcon size={18} />  
                </EmailShareButton> 
                <LinkedinShareButton url={url} summary={description} title={title} className="p-2 rounded !bg-muted/10">  
                    <Image src="/images/assets/external-logos/linkedin.svg" alt="LinkedIn" width={32} height={32} className="rounded"/>
                </LinkedinShareButton> 
                 <WhatsappShareButton url={url} title={title} className="p-2 rounded !bg-muted/10">  
                    <Image src="/images/assets/external-logos/whatsapp.svg" alt="whatsapp" width={32} height={32} className="rounded"/>
                </WhatsappShareButton> 
                 <TwitterShareButton url={url} title={title} hashtags={[ "blog", "news" ]} className="p-2 rounded !bg-muted/10">  
                    <Image src="/images/assets/external-logos/x.svg" alt="x/twitter" width={32} height={32} className="rounded"/>
                </TwitterShareButton> 
                 <FacebookShareButton url={url} title={title} hashtag={"blog"} className="p-2 rounded !bg-muted/10">  
                    <Image src="/images/assets/external-logos/facebook.svg" alt="facebook" width={32} height={32} className="rounded"/>
                </FacebookShareButton> 
            </div>

            <Label>Copy the link</Label>
            <div className="flex flex-col">
                <InputGroup className="flex-grow">
                    <Input
                        className="w-full"
                        value={url.replace("http://", "").replace("https://", "")}
                        readOnly
                    />
                    <InputAddon className="px-0">
                        <CopyLinkButton
                            className="rounded-l-none"
                            iconOnly
                        /> 
                    </InputAddon>
                </InputGroup>
            </div>

        </div>

    </DialogContent>
    );
}