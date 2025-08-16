import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import ProfileSidebar from "../components/ProfileSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EyeIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import ViewProfileButton from "@/components/buttons/ViewProfileButton";


export default function ProfileLayout( { children } : { children: React.ReactNode } ) {
    
    return ( <Page>
        
        <Container>

            <div className="flex gap-2 justify-between">
                <h1 className="text-2xl font-semibold"> Your Profile </h1>
                <ViewProfileButton /> { /* View button linking to own profile */ }
            </div>

            <SidebarProvider>
                <div className="flex gap-2 relative flex-grow pt-6">

                    <ProfileSidebar />

                    <div className="w-full h-full grow">
                        {children}
                    </div>

                </div>
            </SidebarProvider>

        </Container>
        
    </Page>
    );
}