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
import { BlogWithDocsBasicAndAuthorAndThumbnail, DocsBasic, DocWithThumbnailAndAuthor } from "@/lib/types/Blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
import OwnerBanner from "./OwnerBanner";
import BackArrowButton from "@/components/buttons/BackButton";
import BackButton from "@/components/buttons/BackButton";
import ShareButton from "@/components/buttons/ShareButton";

export default async function page ( {
    params
} : {
    params : Promise<{ blogSlug: string }>
} ) {

    const { blogSlug } = await params;

    const result = await getBlog({
        blogSlug: blogSlug.trim().replaceAll(" ", "-").toLowerCase(), 
    });

    console.log("TEST 2: ", navigator.userAgent)


    if (!result.success || !result.data.blog) notFound()

    const blog : BlogWithDocsBasicAndAuthorAndThumbnail = result.data.blog;
    const author = result.data.blog.author;
    const docs = blog?.docs;

    if (!blog) notFound()
    
    return ( <Page>

        <Container>
        
            <div className="flex mb-4">
                <BackButton />
            </div>

            <header>
                <Card variant="accent">
                    <CardContent 
                        className="h-48 flex flex-col py-4 justify-end bg-cover bg-no-repeat bg-center" 
                        style={{ backgroundImage: blog.thumbnail?.url && `linear-gradient(to top, var(--card), transparent), url(${blog.thumbnail?.url})` }}
                        >
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold"> {blog.title} </h2>
                                <Link href={`/user/${author?.slug}`}>
                                    <p className="text-foreground/40 mt-1"> {author?.name}'s Blog </p>
                                </Link>
                            </div>
                            <ShareButton/>
                        </div>
                    </CardContent>
                </Card>
            </header>

            {/* This banner only appears if the user owns the blog */}
            <OwnerBanner className="mt-3"/>

            <main className="mt-6">
                <div className="flex gap-2 flex-wrap">

                    {docs && docs?.length > 0 ? <> 

                        {/* DISPLAY DOCS */}
                        {docs.map((doc, index) => (
                            <DocCard 
                                key={index}
                                blogSlug={blogSlug}
                                docSlug={doc.slug}
                                docTitle={doc.title}
                                docThumbnailUrl={doc?.thumbnail?.url || null}
                                authorId={blog.author?.id}
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