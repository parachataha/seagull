/**
 * Allows users to view a user's blogs and allow the owner to add new blogs, edit existing ones and manage them.
 */

// Server actions
import getBlog from "@/actions/blogs/read/getBlog";
import getUserBlogs from "@/actions/blogs/read/getUserBlogs";
import ManageButton from "@/components/buttons/ManageButton";

// Types
import DocCard from "@/components/cards/doc/DocCard";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import H2 from "@/components/typography/H2";
import { Card, CardContent } from "@/components/ui/card";
import { BlogWithDocsBasicAndAuthorAndThumbnail, DocsBasic } from "@/lib/types/Blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
import OwnerBanner from "./OwnerBanner";
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