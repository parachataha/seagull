import { cn } from "@/lib/utils";

/**
 * Wraps every single page & ensures there is enough padding at the top from the Navbar.
 */

export default function Page( { children, className } : { children: React.ReactNode, className?: string } ) {
    
    return ( <div className={"wrapper page"}>
        
        <div className={cn("container", className)}>
            {children}
        </div>

    </div>
    );
}