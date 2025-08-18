/**
 * Allows users to view a user's blogs and allow the owner to add new blogs, edit existing ones and manage them.
 */

// Server actions
import getUserBlogs from "@/actions/blogs/read/getUserBlogs";

// Components
import BlogCard from "@/components/cards/blog/BlogCard";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import H2 from "@/components/typography/H2";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ManageButton from "@/components/buttons/ManageButton";

import { notFound } from "next/navigation";

export default async function page ( {
    params
} : {
    params : Promise<{ slug: string }>
} ) {

    const { slug } = await params;

    const result = await getUserBlogs( {userSlug: slug.trim().replaceAll(" ", "-").toLowerCase()} );

    if (!result.success || !result.data.blogs) notFound()

    const blogs = result.data.blogs;

    const author = blogs[0].author
    
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

            <header className="flex justify-between">
                <H2 className=""> {author?.name}'s Blogs </H2>
                <ManageButton> Manage blogs </ManageButton> { /* Used to display manage button if owner */ }
            </header>
            

            <div className="flex gap-2 flex-wrap mt-6">

                {blogs.map((blog, index) => (
                    <BlogCard 
                        key={index}
                        blog={blog} 
                    />
                ))}

            </div>

        </Container>
        

    </Page>
    );
}