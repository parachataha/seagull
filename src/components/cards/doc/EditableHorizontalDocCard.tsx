import ManageDocDropdown from "@/components/dropdowns/dropdowns/ManageDocDropdown";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function EditableHorizontalDocCard ( {
    docSlug,
    blogSlug,
    docTitle,
    authorId, 
} : {
    docSlug: string,
    blogSlug: string,
    docTitle: string,
    authorId: number,
} ) {
    
    return ( 
        <Link
            href={`/blogs/${blogSlug}/${docSlug}`}
            className="block w-full"
        >

            <div className="flex gap-5 text-left w-full py-1">
                <p className="w-full max-w-40 truncate"> {blogSlug} </p>
                <p className="text-left"> {docTitle} </p>
                <p> </p>
            </div>  
            
        </Link>
    );
}