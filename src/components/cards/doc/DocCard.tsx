import ManageDocDropdown from "@/components/dropdowns/dropdowns/ManageDocDropdown";
import ManageableDropdown from "@/components/dropdowns/ManageableDropdown";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocsBasic, DocWithThumbnail } from "@/lib/types/Blog";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog, Doc } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function DocCard ( {
    docSlug,
    docTitle,
    docThumbnailUrl,
    blogSlug,
    authorId
} : {
    docSlug: string,
    docTitle: string,
    docThumbnailUrl: string | null,
    blogSlug: string;
    authorId: number | undefined;
} ) {
    
    return ( 
    <Link
        href={`/blogs/${blogSlug}/${docSlug}`}
    >
        <Card variant="accent">

            <CardContent 
                className="px-3 py-3 flex flex-col justify-end w-50 bg-cover h-65 bg-no-repeat bg-center relative" 
                style={{ 
                    backgroundImage: docThumbnailUrl ? `linear-gradient(to top, var(--background), transparent), url(${docThumbnailUrl})` : `` 
                }}
            >

                <ManageDocDropdown authorId={authorId}/>
                
                {docTitle}

            </CardContent>

        </Card>
        
    </Link>
    );
}