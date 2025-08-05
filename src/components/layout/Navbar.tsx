import { cn } from "@/lib/utils";
import Link from "next/link";
import Name from "../auth/Name";

export default function Navbar( { className } : { className?: string } ) {
    
    return ( <nav className="w-full flex items-center justify-between gap-3 my-6">
        
        <Link href='/' className="text-xl font-semibold"> Seagull </Link>

        <div className="flex gap-6">

            <div className="flex gap-4">
                <Link href='/profile'> Profile </Link>
                <Link href='/signup'> Signup </Link>
                <Link href='/login'> Login </Link>
            </div>

            <div className="flex items-center gap-2 border-l border-l-foreground/10 pl-3">
                <div className="w-6 h-6 rounded-full bg-foreground/20"> { /* Profile Picture */ } </div>
                <Name />
            </div>
            
        </div>

    </nav>
    );
}