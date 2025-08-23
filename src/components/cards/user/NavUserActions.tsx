"use client"

import { RootState } from "@/app/redux/store";
import UserAvatar from "@/components/images/UserAvatar";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/input";import { MenubarSeparator } from "@/components/ui/menubar";
;
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BlogWithDocsBasicAndAuthorAndThumbnail } from "@/lib/types/Blog";
import { BuildingIcon, FilePenIcon, NotebookIcon, PlusIcon, User, UserIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export default function NavUserActions ( {
    className = ""
} : {
    className?: string
} ) {

    const user = useSelector((state : RootState) => state.user);
    const router = useRouter();
    
    if (user.email) return ( 
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild> 
                    <Button variant="outline"> <PlusIcon /> Create </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel> Content </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/blogs/${user.slug}/create-blog`)}> <NotebookIcon/> Blog </DropdownMenuItem>
                    {user?.blogs && user.blogs.length > 0 ? 
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger> <FilePenIcon/> Document </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>  
                                {user.blogs.map((blog : BlogWithDocsBasicAndAuthorAndThumbnail) => (
                                <DropdownMenuItem key={blog.id} onClick={() => router.push(`/blogs/${blog.slug}/create`)}> 
                                        {blog.title} 
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub> 
                    :
                        <DropdownMenuItem disabled> <FilePenIcon/> Document </DropdownMenuItem>
                    }
                    <MenubarSeparator />
                    <DropdownMenuLabel> Collaboration </DropdownMenuLabel>
                    <DropdownMenuItem disabled> <UsersIcon/> Team </DropdownMenuItem>
                    <DropdownMenuItem disabled> <BuildingIcon/> Organization </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className={`rounded-lg ${className}`}>
                        <div className="flex items-center gap-3">
                            <UserAvatar 
                                src={user.avatar.url}
                                name={user.name}
                                className="w-6 h-6"
                            />
                            <div className="flex flex-col">
                                <h3 className="">{user.name}</h3>
                            </div>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1">
                        {/* <p className="text-xs text-foreground/50"> Welcome {user.name || "John Doe"} </p> */}
                        <LinkButton href="/profile" variant="ghostBg" className="!justify-start"> <UserIcon/> View Profile </LinkButton>
                        <div className="flex gap-1">
                            <LinkButton href={`/user/${user.slug}/blogs`} variant="ghostBg" className="!justify-start"> <NotebookIcon/> Blogs </LinkButton>
                            <LinkButton href={`/user/${user.slug}/portfolio`} variant="ghostBg" className="!justify-start"> <UserIcon/> Portfolio </LinkButton>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        
        </>
    ) 
    
    return (
        <div className="flex items-center bg-muted rounded-full p-1 gap-0.5">
            {/* <LinkButton href="/login" variant="ghostBg" className="rounded-l-full rounded-r-md"> Login </LinkButton>
            <LinkButton href="/signup" variant="ghostBg" className="rounded-r-full rounded-l-md"> Signup </LinkButton> */}
        </div>
    );
}