import ManageDocDropdown from "@/components/dropdowns/dropdowns/ManageDocDropdown";
import { Card, CardContent } from "@/components/ui/card";
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