"use client"
// Schemas & Types
import { RootState } from "@/app/redux/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import BasicDetails from "../components/BasicDetails";
import PersonalData from "../components/PersonalDetails";
import EditAbout from "../components/EditAbout";
import { CardSpotlight } from "@/components/ui/card-spotlight";

import PageHeader from "../components/PageHeader/PageHeader";
import BlogCard from "@/components/cards/blog/BlogCard";
import { Button, LinkButton } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DocCard from "@/components/cards/doc/DocCard";
import EmptyCard from "@/components/cards/EmptyCard";
import EditableHorizontalDocCard from "@/components/cards/doc/EditableHorizontalDocCard";
import { Doc } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

export default function page() {

    const router = useRouter();
    const user = useSelector((state : RootState) => state.user);

    const [blogs, setBlogs] = useState<any[]>([])

    useEffect(() => {

        /**
         * Redirect new users who have no slug/avatar
         */
        if (user?.slug === null) {
            router.push("/profile/slug")
        }

        const blogs = user.blogs || []

        blogs.forEach(blog => {
            setBlogs([ ...blogs, ...blog.docs ])
        })
        
    }, [user])

    return ( 

        <div>

            <PageHeader
                breadcrumbs={[
                    { label: "Overview", href: "/profile" }
                ]}
            />

            <h2 className="text-xl font-medium mt-5 mb-1"> Overview </h2>
            <p className="text-sm text-foreground/50"> Welcome back! Here you can manage your blogs and other account preferences </p>
            
            {/* DISPLAY USER BLOGS */}
            <h3 className="text-md text-muted-foreground mt-6 mb-2"> Your blogs </h3>
            {user?.blogs && user?.blogs.length > 0 ? 
                <div className="flex gap-2 flex-wrap"> 
                    {user?.blogs?.map((blog, index) => (
                        <BlogCard
                            key={index}
                            blog={blog}
                        />
                    ))}

                    <Link href={`/blogs/${user.slug}/create-blog`} className="block"> 
                        <Card className="w-40 h-full"> 
                            <CardContent className="flex flex-col text-center items-center justify-center">
                                <PlusIcon/>
                                <p> Create new blog </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            :   
                <div className="flex flex-col w-full">
                    <EmptyCard
                        title="No blogs yet"
                        description="Create a blog let to start sharing your knowledge with the world"
                        actionLinks={[ {
                            href: `/blogs/${user.slug}/create-blog`,
                            label: <> <PlusIcon/> Create blog </>
                        } ]}
                    />
                </div>
            }

            {/* DISPLAY USER'S LATEST DOCS */}
            <h3 className="text-md text-muted-foreground mt-6 mb-2"> Your latest documents </h3>
            {blogs && blogs.length > 0 ? 
                <Card> 
                    <CardContent className="flex flex-col w-full">
                        <div className="overflow-auto w-full max-h-90">
                            {blogs?.map((blog, index) => (
                                <React.Fragment key={index}>
                                    {blog.docs?.map((doc : Doc, index : number) => (
                                        <div className="flex items-center gap-3" key={index}> 
                                            <Image
                                                src={blog.thumbnail.url}
                                                alt="Thumbnail"
                                                width={24}
                                                height={24}
                                                className="object-cover rounded aspect-square"
                                            />
                                            <EditableHorizontalDocCard
                                                docSlug={doc.slug || ""}
                                                docTitle={doc.title || ""}
                                                authorId={user.id}
                                                blogSlug={blog.slug}
                                            />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            :   
                <div className="flex flex-col w-full">
                    <EmptyCard
                        title="No articles yet"
                        description="Create an article within a blog let to start sharing your knowledge with the world"
                    />
                </div>
            }

        </div>

    );
}