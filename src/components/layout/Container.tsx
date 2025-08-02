import { cn } from "@/lib/utils";

/**
 * Wraps every single page
 */

export default function Container( { children, className } : { children: React.ReactNode, className?: string } ) {
    
    return ( <div className={"wrapper"}>
        
        <div className={cn("container", className)}>
            {children}
        </div>

    </div>
    );
}