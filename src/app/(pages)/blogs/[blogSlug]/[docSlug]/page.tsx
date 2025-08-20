import getDoc from "@/actions/docs/read/getDoc";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import Image from "next/image";
import { notFound } from "next/navigation";

import { generateHTML } from '@tiptap/html/server'
import { JSONContent } from '@tiptap/core'
import ReadOnly, { tiptapExtensions } from "@/components/ui/rich-text-editor/ReadOnly";
import BlogLabel from "@/components/cards/blog/BlogLabel";
import Link from "next/link";
import { Metadata } from "next";

type ParamsType = Promise<{ docSlug: string, blogSlug: string }>

export async function generateMetadata(
    { params }: { params: ParamsType },
): Promise<Metadata> {

    const { docSlug, blogSlug } = await params;

    const result = await getDoc({ 
        blogSlug: blogSlug.trim().replaceAll(" ", "-").toLowerCase(),
        docSlug: docSlug.trim().replaceAll(" ", "-").toLowerCase(),
    });

    if (result.status === 404 || !result.success) return {
        applicationName: 'Seagull',
        title: "Page not found",
        description: "Sorry, this article does not seem to exist",
        themeColor: "#C37F57",
        openGraph: {
            title: "Page not found",
            description: "Sorry, this article does not seem to exist",
            type: "article",
            images: [
                    "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWtJBA0GV5A2bEgvDlrfomqMG09RCujZ3sVBhO",
                ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Page not found",
            description: "Sorry, this article does not seem to exist",
            images: [
                "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWtJBA0GV5A2bEgvDlrfomqMG09RCujZ3sVBhO",
            ],
        },
    }

    const doc = result.data.doc;
    const blog = doc.blog;
    const author = blog.author;

    const tiptapBody: JSONContent = doc.body as JSONContent || { type: 'doc', content: [] }

    /**
     * Convert HTML to plain text and get first 160 characters
     */
    const htmlContent = generateHTML(tiptapBody, tiptapExtensions);
    const description = htmlContent.replace(/<[^>]+>/g, '').slice(0, 160);

    return {
        applicationName: 'Seagull',
        title: doc.title,
        description,
        authors: [{ name: blog.author?.name || "Seagull", url: `/` }],
        themeColor: "#C37F57",
        openGraph: {
            title: doc.title,
            description,
            type: "article",
            images: [
                doc.thumbnail?.url ||
                "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MW2ucz8CDXwvPbRW5gAI4D8i7o0Uct9HMTplya",
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: doc.title,
            description,
            images: [
                doc.thumbnail?.url ||
                "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MW2ucz8CDXwvPbRW5gAI4D8i7o0Uct9HMTplya",
            ],
        },
    };

}

export default async function page ( {
    params
} : {
    params : ParamsType
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