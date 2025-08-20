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

            <div className="flex flex-col w-full h-full items-center justify-between">

                <div className="w-full max-w-200">

                    <header className="pb-4 mb-4">
                        <h2 className="text-2xl font-semibold"> Create new document</h2>
                        <p className="text-muted-foreground font-semibold mt-1"> {blogSlug} </p>
                    </header>

                    <CreateDocForm blogSlug={blogSlug}/>

                </div>

            </div>


        </Container>
        
    </Page>
    );
}