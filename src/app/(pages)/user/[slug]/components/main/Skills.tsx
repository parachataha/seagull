import { Card, CardContent } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";

export default function Skills( { user, className } : { user: PublicSafeUser, className?: string } ) {
    
    return ( <Card className="bg-card">

        <CardContent>
            <article>
                <h3 className="text-foreground/30 font-semibold"> Skills </h3>
                {/* {user.bio || "👋 Hey, im new here"} */}
            </article>
        </CardContent>

    </Card>
    );
}