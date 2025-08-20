// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

export default async function page () {
    
    return ( <Page>

        <Container>
        
            <div className="flex">
                <Link href="./" className="mb-4">
                    <ArrowLeft size={28} />
                </Link>
            </div>

            <header>
                <Skeleton className="w-full h-45"/>
            </header>

            <main className="mt-6">
                <div className="grid grid-cols-4 gap-4">
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                    <Skeleton className="w-full h-50"/>
                </div>
            </main>


        </Container>
        

    </Page>
    );
}