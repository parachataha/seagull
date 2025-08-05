import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import ProfileSidebar from "./components/ProfileSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function ProfileLayout( { children } : { children: React.ReactNode } ) {
    
    return ( <Page>
        
        <Container>

            <h1 className="text-2xl font-semibold"> Your Profile </h1>

            <SidebarProvider>
                <div className="flex gap-1 relative flex-grow pt-6">

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