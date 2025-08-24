import getDoc from "@/actions/docs/read/getDoc";
import CreateDocForm from "@/components/forms/doc/CreateDocForm";
import EditDocForm from "@/components/forms/doc/EditDocForm";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Label } from "@/components/ui/input";
import { notFound } from "next/navigation";

/**
 * Used to create a new doc in a specific blog
 */

export default async function page ( {
    params
} : {
    params : Promise<{ blogSlug: string, docSlug: string }>
} ) {

    const {blogSlug, docSlug} = await params

    if (!blogSlug || !docSlug) notFound();

    const result = await getDoc({ 
        blogSlug: blogSlug.trim().replaceAll(" ", "-").toLowerCase(),
        docSlug: docSlug.trim().replaceAll(" ", "-").toLowerCase(),
    })

    if (result.status === 404) notFound()
    if (!result.success) notFound() // Will change this later to error pages

    const doc = result.data.doc;
    const blog = result.data.doc.blog;
    const author = result.data.doc.blog.author;

    if (!author || !author.name || !author.slug) notFound();
    
    return ( <Page>

        <Container>

            <div className="flex flex-col lg:flex-row gap-3 pt-6">
                <div className="w-full max-w-200">

                    <header className="pb-4 mb-4">
                        <h2 className="text-3xl font-bold"> 
                            You're Editing
                            <br/>
                            <span className="text-foreground/30 text-sm font-semibold mt-1 capitalize"> {docSlug} </span>
                        </h2>
                    </header>

                    <EditDocForm blogSlug={blogSlug} docSlug={docSlug} author={author} doc={doc}/>

                </div>
                
                <div className="text-foreground/50">
                    We will generate some information here once you publish this
                </div>
            </div>

        </Container>
        
    </Page>
    );
}