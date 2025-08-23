// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export default async function page () {
    
    return ( <Page>

        <Container>

            <div className="flex gap-2">
                <div className="max-w-200 w-full">
                    <article className="max-w-200 w-full">

                        <header className="flex flex-col gap-2 pb-5 mb-5 border-b">
                            <Skeleton className="max-w-170 w-full h-12 !rounded-md"/>
                            <Skeleton className="max-w-80 w-full h-6 !rounded-md"/>

                            <Skeleton className="mt-5 w-full h-110"/>
                            <Skeleton className="max-w-130 w-full h-8 !rounded-md"/>

                            <Skeleton className="max-w-50 w-full h-14 !rounded-md mt-4"/>
                        </header>

                        <main className="mt-6 flex flex-col gap-2 items-center justify-center">
                            <Skeleton className="max-w-220 w-full h-200 !rounded-md"/>
                        </main>

                    </article>
                </div>
            </div>


        </Container>
        

    </Page>
    );
}