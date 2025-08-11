// Types


// Components
import { Card, CardContent } from "@/components/ui/card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Content from "./components/Content";

export default function page() {

    
    return ( <Card>
        
        <CardContent>

            {/* INFORMATION ABOUT PROJECTS */}
            <CardSpotlight className="p-8">
                    <h3 className="font-semibold"> Manage your projects </h3>
                    <p className="text-foreground/60 mt-1">  
                        Add, delete or update your projects. These projects let users view your working 
                        skill-set and see working-proof good your abilities are.
                    </p>
            </CardSpotlight>

            <Content />

        </CardContent>

    </Card>
    );
}