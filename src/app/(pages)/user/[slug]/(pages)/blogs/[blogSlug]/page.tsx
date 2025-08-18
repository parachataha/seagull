/**
 * Allows users to view a user's blogs and allow the owner to add new blogs, edit existing ones and manage them.
 */

// Server actions
import getUserBlogs from "@/actions/blogs/read/getUserBlogs";
import ManageButton from "@/components/buttons/ManageButton";

// Types
import DocCard from "@/components/cards/doc/DocCard";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import H2 from "@/components/typography/H2";
import { Card, CardContent } from "@/components/ui/card";
import { BlogWithDocsBasic, DocsBasic } from "@/lib/types/Blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";

export default async function page ( {
    params
} : {
    params : Promise<{ slug: string, blogSlug: string }>
} ) {

    const { slug, blogSlug } = await params;

    const result = await getUserBlogs( {userSlug: slug.trim().replaceAll(" ", "-").toLowerCase()} );

    if (!result.success || !result.data.blogs) notFound()

    const blogs : BlogWithDocsBasic[] = result.data.blogs;
    const blog : BlogWithDocsBasic | undefined = result.data.blogs.find(blog => blog.slug === blogSlug);
    const docsBasic : DocsBasic[] | undefined = blog?.docs;

    if (!blog) notFound()

    const user = result.data.user;
    
    return ( <Page>

        <Container>
        
            <div className="flex">
                <Link 
                    href="./"
                    className="mb-4"
                >
                    <ArrowLeft size={28} />
                </Link>
            </div>

            <header>
                <Card variant="accent">
                    <CardContent className="h-48 flex flex-col py-4 justify-end">

                        <H2 className=""> {blog.title} </H2>
                        <Link href={`/user/${slug}`}>
                            <p className="text-foreground/40 mt-1"> {user.name}'s Blog </p>
                        </Link>

                    </CardContent>
                </Card>

                {/* <div className="flex justify-between">
                    <ManageButton> Create new doc </ManageButton> 
                </div> */}
            </header>


            <main className="mt-6">

                <div className="flex gap-2 flex-wrap">

                    {docsBasic && docsBasic?.length > 0 ? <> 

                        {/* DISPLAY DOCS */}
                        {docsBasic.map((doc, index) => (
                            <DocCard 
                                key={index}
                                userSlug={slug} 
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