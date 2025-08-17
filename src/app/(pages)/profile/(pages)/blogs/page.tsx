"use client"

import { RootState } from "@/app/redux/store";
import CreateBlog from "@/components/buttons/CreateBlog";
import { LinkButton } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useDispatch, useSelector } from "react-redux";

export default function page ( {
     
} : {
     
} ) {

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    return ( <div>
        
        <CardSpotlight>
                <h3 className="font-semibold"> Your blogs </h3>
                <p className="text-foreground/60 mt-1">  
                    Here you can create as many blogs as you want. Blogs can be used to categorize docs into
                    their respective topics. Within a blog can have as many documents as needed. These documents can contain 
                    images, text, tables and more!
                </p>
        </CardSpotlight>

        <main className="!mt-3">
            <div className="flex gap-2">
                <CreateBlog />
            </div>
        </main>

    </div>
    );
}