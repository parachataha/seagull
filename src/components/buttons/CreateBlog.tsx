import Link from "next/link";


export default function CreateBlog ( {
     
} : {
     
} ) {
    
    return ( <Link 
        href="/profile/blogs/create"
        className="text-center flex items-center justify-center px-6 py-4 aspect-square bg-muted rounded-lg"
    >
        
        Create blog

    </Link>
    );
}