import Link from "next/link";
import { LinkButton } from "../ui/button";


export default function CreateBlogButton ( {
    className = ""
} : {
    className?: string;
} ) {
    
    return ( <LinkButton 
        href="/profile/blogs/create"
        variant="outline"
        className={`${className}`}
    >
        
        Create blog

    </LinkButton>
    );
}