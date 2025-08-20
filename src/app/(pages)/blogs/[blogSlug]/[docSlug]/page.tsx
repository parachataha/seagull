import getDoc from "@/actions/docs/read/getDoc";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import Image from "next/image";
import { notFound } from "next/navigation";

import { generateHTML } from '@tiptap/html'
import ReadOnly from "@/components/ui/rich-text-editor/ReadOnly";
import BlogLabel from "@/components/cards/blog/BlogLabel";
import { Label } from "@/components/ui/input";
import Link from "next/link";

export default async function page ( {
    params
} : {
    params : Promise<{ blogSlug: string, docSlug: string }>
} ) {

    const { blogSlug, docSlug } = await params;

    if (!blogSlug.trim().replaceAll(" ", "-") || !docSlug.trim().replaceAll(" ", "-")) notFound()

    const result = await getDoc({ 
        blogSlug: blogSlug.trim().replaceAll(" ", "-").toLowerCase(),
        docSlug: docSlug.trim().replaceAll(" ", "-").toLowerCase(),
    })

    if (result.status === 404) notFound()
    if (!result.success) notFound() // Will change this later to error pages

    const doc = result.data.doc;
    const blog = result.data.doc.blog;
    const author = result.data.doc.blog.author;
    
    return ( <Page>

        <Container>

            {/* Split the page */}
            <div className="flex gap-2">
                {/* Main article content */}
                <div>
                    <article className="max-w-200">

                        <header className="pt-6 pb-8 mb-8 border-b">

                            <h1 className="text-3xl font-bold mb-1"> {doc.title} </h1>
                            <Link href={`/user/${blog.author?.slug}/blogs`}>
                                <p className="text-sm text-muted-foreground mb-4 hover:underline"> By {blog.author?.name} </p>
                            </Link>

                            {doc.thumbnail && <>
                                {/* RENDER THUMBNAIL */}
                                {doc.thumbnail.url && 
                                    <Image
                                        loading="lazy"
                                        src={doc.thumbnail.url}
                                        alt={doc.thumbnail.description || "Image"}
                                        width={200}
                                        height={200}
                                        className="w-full object-contain rounded-xl"
                                    />
                                }

                                {/* RENDER THUMBNAIL DESCRIPTION */}
                                {doc.thumbnail.description && 
                                    <p className="mt-3 text-sm text-muted-foreground"> {doc.thumbnail.description} </p>
                                }
                            </>}
                            
                            {/* BLOG AND AUTHOR INFO */}
                            <div className="mt-6">
                                <div className="flex">
                                    <BlogLabel  
                                        className="w-full max-w-60"
                                        slug={blog.slug}
                                        thumbnail={blog.thumbnail?.url}
                                        title={blog.title}
                                        authorName={null}
                                    />
                                </div>
                            </div>

                        </header>

                        <main className="pb-16"> 
                            {/* ARTICLE BODY */}    
                            <ReadOnly json={doc.body}/>
                        </main>

                    </article>
                </div>

                {/* Scroll tracker */}
            </div>


        </Container>

    </Page>
    );
}