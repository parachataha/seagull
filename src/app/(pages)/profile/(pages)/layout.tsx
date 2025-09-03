import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import ProfileSidebar from "../components/ProfileSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EyeIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import ViewProfileButton from "@/components/buttons/ViewProfileButton";
import FullPage from "@/components/layout/FullPage";


export default function ProfileLayout( { children } : { children: React.ReactNode } ) {
    
    return ( <FullPage className="!bg-popover !p-0 !m-0">
        
        <Container className="!max-w-350 !p-0 !m-0">
            <div className="pb-6">

                <SidebarProvider>
                    <div className="flex gap-2 relative flex-grow pt-6 px-4">

                        <ProfileSidebar />

                        <div className="w-full h-full grow px-8 py-6 bg-background rounded-xl">
                            {children}
                        </div>

                    </div>
                </SidebarProvider>
            </div>

        </Container>
        
    </FullPage>
    );
}