import { Card, CardContent } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";

export default function Qualifications( { user, className } : { user: PublicSafeUser, className?: string } ) {
    
    return ( <Card className="bg-card">

        <CardContent>
            <h3 className="text-foreground/30 font-semibold"> Qualifications </h3>
            {/* {user.about || "Coming soon"} mt-2 */}
        </CardContent>

    </Card>
    );
}