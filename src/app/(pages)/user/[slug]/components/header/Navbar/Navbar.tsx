
import { PublicSafeUser } from "@/lib/types/User";
import NavbarButton from "./NavbarButton";
import StickyCard from "@/components/ui/StickyCard";
import { Button, LinkButton } from "@/components/ui/button";

export default function Navbar( { className, user } : { className?: string, user: PublicSafeUser } ) {
    
    return ( <StickyCard scrollY={480} className={`overflow-hidden shadow top-4 px-2 ${className}`}>
        
        <div className="flex justify-between items-center gap-2 pr-2">

            {/* NAVBAR LINKS */}
            <div className="flex gap-3">
                <NavbarButton className="!pl-8" href={`/user/${user.slug}`}>Overview</NavbarButton>
                <NavbarButton href={`/user/${user.slug}#skills`}>Skills</NavbarButton>
                <NavbarButton href={`/user/${user.slug}`}>Projects</NavbarButton>
                <NavbarButton href={`/user/${user.slug}`}>Testimonials</NavbarButton>
            </div>

            <div className="pr-4">
                <Button variant="default"> Check prices </Button>
            </div>

        </div>

    </StickyCard>
    );
}