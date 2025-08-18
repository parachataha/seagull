import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogWithDocsBasicAndAuthor } from "@/lib/types/Blog";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard ( {
    blog,
} : {
    blog: BlogWithDocsBasicAndAuthor;
} ) {
    
    return ( 
    <Link
        href={`/blogs/${blog.slug}`}
    >
        <Card variant="accent">

            <CardContent className="px-3 py-3 pt-40 flex flex-col items-start w-50">

                <div>
                    {blog.title}
                    <p className="text-sm text-muted-foreground mt-[1px]"> {blog.docs.length} published </p>
                </div>

            </CardContent>

        </Card>
        
    </Link>
    );
}