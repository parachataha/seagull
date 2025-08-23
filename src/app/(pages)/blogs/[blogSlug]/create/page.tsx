import CreateDocForm from "@/components/forms/doc/CreateDocForm";
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
    params : Promise<{ blogSlug: string }>
} ) {

    const {blogSlug} = await params

    if (!blogSlug) notFound();
    
    return ( <Page>

        <Container>

            <div className="flex gap-3 pt-6">
                <div className="w-full max-w-200">

                    <header className="pb-4 mb-4">
                        <h2 className="text-3xl font-bold"> 
                            Add to
                            <span className="text-foreground/30 font-semibold mt-1 capitalize"> {blogSlug} </span>
                            Blog
                        </h2>
                    </header>

                    <CreateDocForm blogSlug={blogSlug}/>

                </div>
                
                <div className="text-foreground/50">
                    We will generate some information here once you publish this
                </div>
            </div>

        </Container>
        
    </Page>
    );
}