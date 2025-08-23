import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function UserCard ( {
    name,
    slug,
    avatarURL,
    label,

    className = "",
} : {
    name: string;
    slug: string;
    avatarURL: string;
    label: string;

    className?: string;
} ) {
    
    return ( <Card className={`w-60 h-70 ${className} border-0`}>

        <CardContent className="flex flex-col justify-between items-start">

            <div>
                <h3 className="text-lg font-semibold"> {name} </h3>
                <p className="text-sm text-muted-foreground"> {label} </p>
            </div>

            <LinkButton 
                variant="neutral" 
                className="w-full"
                href={`/user/${slug}`}
            > View profile </LinkButton>

        </CardContent>
        
    </Card>
    );
}