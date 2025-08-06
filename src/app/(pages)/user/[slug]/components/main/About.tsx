import { Card, CardContent } from "@/components/ui/card";
import { PublicSafeUser } from "@/lib/types/User";

export default function About( { user, className } : { user: PublicSafeUser, className?: string } ) {
    
    return ( <Card className="bg-card">

        <CardContent>
            <article>
                <h3 className="text-foreground/30 font-semibold"> About </h3>
                {user.about
                    // Display line-breaks
                    ? user.about.split('\n').map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                        ))
                    : "👋 Hey, I'm new here"
                }
            </article>
        </CardContent>

    </Card>
    );
}