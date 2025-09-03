import { Button, LinkButton } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function EmptyCard ( {
    title = "No data yet",
    description = "You have no data here, come back later",
    actionLinks,
    actionButtons,
} : {
    title: string;
    description: string

    actionLinks?: { 
        href: string;
        label: React.ReactNode;
    }[]

    actionButtons?: { 
        action: any;
        label: React.ReactNode;
    }[]
} ) {
    
    return (
        <Card>
            <CardContent className="py-20 flex flex-col items-center text-center justify-center">

                <div className="max-w-90 text-center">
                    <p className="text-lg font-semibold"> {title} </p>
                    <p className="text-muted-foreground mt-2"> Create an article within a blog let to start sharing your knowledge with the world </p>

                    {(actionLinks || actionButtons) && <div className="mt-4 flex items-center text-center justify-center">
                        {actionLinks?.map((link, index) => (
                            <LinkButton key={index} href={link.href} variant="outline"> {link.label} </LinkButton>
                        ))}
                        
                        {actionButtons?.map((button, index) => (
                            <Button key={index} onClick={button.action} variant="outline"> {button.label} </Button>
                        ))}
                    </div>}
                </div>

            </CardContent>
        </Card>
    );
}