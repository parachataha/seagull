"use client"

import getOwnedBlogs from "@/actions/blogs/read/getOwnedBlogs";
import getUserBlogs from "@/actions/blogs/read/getUserBlogs";
import { RootState } from "@/app/redux/store";
import CreateBlogButton from "@/components/buttons/CreateBlogButton";
import BlogCard from "@/components/cards/blog/BlogCard";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import useServerAction from "@/hooks/useServerAction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function page ( {
     
} : {
     
} ) {
    
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);

    const { run, loading, error, success } = useServerAction(() => 
        getOwnedBlogs({
            userAgent: navigator.userAgent
        })
    );

    useEffect(() => {
        if (user.slug) {
            run()
        }
    }, [user.email])
    
    return ( <div>

        <PageHeader
            className="mb-5"
            breadcrumbs={[
                { label: "Blogs", href: "/profile/blogs" }
            ]}
        />
        
        <CardSpotlight>
                <h3 className="font-semibold"> Your blogs </h3>
                <p className="text-foreground/60 mt-1">  
                    Here you can create as many blogs as you want. Blogs can be used to categorize docs into
                    their respective topics. Within a blog can have as many documents as needed. These documents can contain 
                    images, text, tables and more!
                </p>
        </CardSpotlight>

        <main className="!mt-3">

            <header className="flex justify-between">

                <h2 className="mb-2 font-semibold text-lg"> 
                    Manage your Blogs 
                </h2>

                <CreateBlogButton />
                
            </header>

            <div className="flex gap-2">
                {user.blogs && user.blogs.length > 0 && <>
                    {user.blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            blog={blog}
                        />
                    ))}
                </>} 
            </div>


        </main>

    </div>
    );
}