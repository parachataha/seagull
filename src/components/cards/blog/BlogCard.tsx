import ManageBlogDropdown from "@/components/dropdowns/dropdowns/ManageBlogDropdown";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogWithDocsBasicAndAuthorAndThumbnail } from "@/lib/types/Blog";
import { PublicSafeUser } from "@/lib/types/User";
import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard ( {
    blog,
} : {
    blog: BlogWithDocsBasicAndAuthorAndThumbnail;
} ) {
    
    return ( 
    <Link
        href={`/blogs/${blog.slug}`}
        className="relative"
    >
        <Card variant="accent">

            <ManageBlogDropdown
                authorId={blog?.author?.id || 0}
            />

            <CardContent 
                className="px-3 py-3 pt-40 flex flex-col items-start w-50 bg-cover bg-no-repeat bg-center" 
                style={{ backgroundImage: blog.thumbnail?.url && `linear-gradient(to top, var(--background), transparent), url(${blog.thumbnail?.url})` }}
            >

                <div>
                    {blog.title}
                    <p className="text-sm text-muted-foreground mt-[1px]"> {blog.docs.length} published </p>
                </div>

            </CardContent>

        </Card>
        
    </Link>
    );
}