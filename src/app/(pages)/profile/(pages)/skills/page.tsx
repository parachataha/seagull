import { Card, CardContent } from "@/components/ui/card";
import ContentWrapper from "./components/Content";
import PageHeader from "../../components/PageHeader/PageHeader";


export default function SkillsPage() {
    
    return ( <>

        <PageHeader
            className="mb-5"
            breadcrumbs={[
                { label: "Skills", href: "/profile/skills" }
            ]}
        />

        <ContentWrapper/>

    </> 
    );
}