// Server actions
import getUser from "@/actions/user/get/getUser";

// Types
import { slugSchema } from "@/schemas/user";

// Next.js
import { notFound } from "next/navigation";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import getDominantHexColorFromURL from "@/components/images/ColorBanner";
import ColorBanner from "@/components/images/ColorBanner";
import UserAvatar from "@/components/images/UserAvatar";
import UserHeader from "./components/header/UserHeader";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/main/About";
import Qualifications from "./components/main/Qualifications";
import Skills from "./components/main/Skills";


export default async function page( { params } : { params : Promise<{ slug: string }> } ) {

    const { slug } = await params;
    console.log(slug)

    if (!slugSchema.safeParse(slug.trim().toLowerCase().replaceAll(" ","")).success) notFound();

    const result = await getUser({
        slug: slug.trim().toLowerCase().replaceAll(" ",""), 
        userAgent: navigator.userAgent
    })

    if (!result) notFound();
    if (!result.success || !result.data) notFound();

    const user = result?.data;
    
    
    return ( <Page>
        
        <Container>

            <UserHeader user={user} />
            <Navbar user={user} className="mt-4" />

            {/* MAIN CONTENT */}
            {/* About, qualifications, projects, clients, testimonials */}
            <main className="mt-4 flex flex-col gap-3">
                <About user={user}/>
                <div className="grid md:grid-cols-[60%_39%] gap-3">
                    <Skills user={user}/>
                    <Qualifications user={user}/>
                </div>
            </main>

            <div className="pb-3900">
            </div>

        </Container>

    </Page>
    );
}