/**
 * Allows users to view a user's blogs and allow the owner to add new blogs, edit existing ones and manage them.
 */

import getUserBlogs from "@/actions/blogs/getUserBlogs";

import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import H2 from "@/components/typography/H2";

import { ServerResponse } from "@/lib/types/ServerResponse";
import { Blog } from "@prisma/client";

import { notFound } from "next/navigation";

export default async function page ( {
    params
} : {
    params : Promise<{ slug: string }>
} ) {

    const { slug } = await params;

    const result :
        ServerResponse<{
            blogs: Blog[], 
            user: { name: string, id: number }
        }> 
    = await getUserBlogs( {userSlug: slug.trim().replaceAll(" ", "-").toLowerCase()} );

    if (!result.success) notFound()

    const blogs = result.data.blogs;
    
    return ( <Page>

        <Container>
            
            <H2 className=""> {result.data.user.name}'s Blogs </H2>

            <div className="flex gap-2 flex-wrap mt-3">

                {blogs.map((blog : Blog, index : number) => (
                    <div>
                        {blog.title}
                    </div>
                ))}

            </div>

        </Container>
        

    </Page>
    );
}