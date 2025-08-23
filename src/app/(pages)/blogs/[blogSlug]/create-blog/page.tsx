import Container from "@/components/layout/Container";
import FullPage from "@/components/layout/FullPage";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import H2 from "@/components/typography/H2";
import CreateBlogForm from "@/components/forms/blog/CreateBlogForm";
import BackButton from "@/components/buttons/BackButton";

export default function page ( {
     
} : {
     
} ) {
    
    return ( <FullPage>
        
        <Container className="!max-w-200">

            <BackButton className="mt-6 mb-8"/>

            <H2> Create blog </H2>
            <p className="!mt-2 text-foreground/80"> A blog allows you to create a group of relating documents </p>
            
            <CreateBlogForm className="!mt-6"/>


        </Container>

    </FullPage>
    );
}