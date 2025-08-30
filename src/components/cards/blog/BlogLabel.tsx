import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


export default function BlogLabel ( {
    className = "",
    thumbnail,
    slug,
    title,
    authorName = "John doe",
} : {
    className?: string;
    thumbnail?: string | null;
    slug: string;
    title: string;
    authorName?: string | null
} ) {
    
    return ( 
        <Link 
            href={`/blogs/${slug}`} 
            className={`${className}`}
        >
            <Card className="border-0">
                <div className="flex items-center gap-3 p-2">
                    <Image  
                        src={thumbnail || " "}
                        alt={title}
                        width={50}
                        height={50}
                        className="object-cover rounded aspect-square"
                    />
                    <div>
                        <p className="font-semibold mb-0.5"> {title} </p>
                        <p className="text-sm text-muted-foreground capitalize">
                            {authorName ? 
                                `By ${authorName}` : "Published blog"
                            }
                        </p> 
                    </div>
                </div>   
            </Card>
        </Link>
    );
}