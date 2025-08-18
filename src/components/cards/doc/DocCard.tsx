import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DocsBasic } from "@/lib/types/Blog";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog, Doc } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function DocCard ( {
    doc,
    blogSlug,
    userSlug,
} : {
    doc: DocsBasic;
    blogSlug: string;
    userSlug: string
} ) {
    
    return ( 
    <Link
        href={`/user/${userSlug}/blogs/${blogSlug}/${doc.slug}`}
    >
        <Card variant="accent">

            <CardContent className="px-3 py-3 pt-30 flex flex-col items-end">

                {doc.title}

            </CardContent>

        </Card>
        
    </Link>
    );
}