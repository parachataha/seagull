
import { PublicSafeUser } from "@/lib/types/User";
import NavbarButton from "./NavbarButton";
import StickyCard from "@/components/ui/StickyCard";
import { LinkButton } from "@/components/ui/button";

export default function Navbar( { className, user } : { className?: string, user: PublicSafeUser } ) {
    
    return ( <StickyCard scrollY={350} className={`overflow-hidden shadow top-4 py-0 px-0 ${className}`}>
        
        <div className="flex justify-between items-center gap-2 pr-2">

            {/* NAVBAR LINKS */}
            <div className="flex gap-3">
                <NavbarButton className="!pl-8" href={`/user/${user.slug}`}>Overview</NavbarButton>
                <NavbarButton href={`/user/${user.slug}#skills`}>Skills</NavbarButton>
                <NavbarButton href={`/user/${user.slug}`}>Projects</NavbarButton>
                <NavbarButton href={`/user/${user.slug}`}>Testimonials</NavbarButton>
            </div>

            <div>
                <LinkButton href="/" variant="default"> Check prices </LinkButton>
            </div>

        </div>

    </StickyCard>
    );
}