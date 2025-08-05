import { cn } from "@/lib/utils";

/**
 * Wraps every single page & ensures there is enough padding at the top from the Navbar.
 */

export default function FullPage( { children, className } : { children: React.ReactNode, className?: string } ) {
    
    return ( <div className={`wrapper page absolute top-0 left-0 w-full h-full bg-background ${className}`}>
        
        {children}

    </div>
    );
}