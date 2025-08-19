/**
 * Allows users to view a user's blogs and allow the owner to add new blogs, edit existing ones and manage them.
 */

// Server actions
import getBlog from "@/actions/blogs/read/getBlog";
import getUserBlogs from "@/actions/blogs/read/getUserBlogs";
import ManageButton from "@/components/buttons/ManageButton";

// Types
import DocCard from "@/components/cards/doc/DocCard";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import H2 from "@/components/typography/H2";
import { Card, CardContent } from "@/components/ui/card";
import { BlogWithDocsBasicAndAuthorAndThumbnail, DocsBasic } from "@/lib/types/Blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
import OwnerBanner from "./OwnerBanner";

export default async function page ( {
    params
} : {
    params : Promise<{ blogSlug: string }>
} ) {

    const { blogSlug } = await params;

    const result = await getBlog( {blogSlug: blogSlug.trim().replaceAll(" ", "-").toLowerCase()} );

    if (!result.success || !result.data.blog) notFound()

    const blog : BlogWithDocsBasicAndAuthorAndThumbnail = result.data.blog;
    const author = result.data.blog.author;
    const docsBasic : DocsBasic[] | undefined = blog?.docs;

    if (!blog) notFound()

    console.log(blog)
    
    return ( <Page>

        <Container>
        
            <div className="flex">
                <Link href="./" className="mb-4">
                    <ArrowLeft size={28} />
                </Link>
            </div>

            <header>
                <Card variant="accent">
                    <CardContent 
                        className="h-48 flex flex-col py-4 justify-end bg-cover" 
                        style={{ backgroundImage: blog.thumbnail?.url && `linear-gradient(to top, var(--card), transparent), url(${blog.thumbnail?.url})` }}
                        >
                        <H2 className=""> {blog.title} </H2>
                        <Link href={`/user/${author?.slug}`}>
                            <p className="text-foreground/40 mt-1"> {author?.name}'s Blog </p>
                        </Link>
                    </CardContent>
                </Card>
            </header>

            {/* This banner only appears if the user owns the blog */}
            <OwnerBanner className="mt-3"/>

            <main className="mt-6">
                <div className="flex gap-2 flex-wrap">

                    {docsBasic && docsBasic?.length > 0 ? <> 

                        {/* DISPLAY DOCS */}
                        {docsBasic.map((doc, index) => (
                            <DocCard 
                                key={index}
                                blogSlug={blogSlug}
                                doc={doc} 
                            />
                        ))}
                
                    </>
                    :
                    <div className="w-full h-90 flex items-center justify-center text-muted-foreground">

                        <p> This blog has no published articles or documents yet </p>
                    
                    </div>}

                </div>
            </main>


        </Container>
        

    </Page>
    );
}