// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export default async function page () {
    
    return ( <Page>

        <Container>

            <article>

                <header className="flex flex-col gap-2 items-center justify-center">
                    <Skeleton className="max-w-200 w-full h-12 !rounded-md"/>
                    <Skeleton className="max-w-90 w-full h-12 !rounded-md"/>

                    <Skeleton className="mt-5 w-full h-130"/>
                    <Skeleton className="w-full h-9 !rounded-md"/>
                </header>

                <main className="mt-6 flex flex-col gap-2 items-center justify-center">
                    <Skeleton className="max-w-220 w-full h-200 !rounded-md"/>
                </main>

            </article>


        </Container>
        

    </Page>
    );
}