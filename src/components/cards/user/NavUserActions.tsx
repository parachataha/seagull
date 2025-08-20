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
import { BuildingIcon, FilePenIcon, NotebookIcon, PlusIcon, UserIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";


export default function NavUserActions ( {
    className = ""
} : {
    className?: string
} ) {

    const user = useSelector((state : RootState) => state.user);
    
    if (user.email) return ( 
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild> 
                    <Button variant="outline"> <PlusIcon /> Create </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel> Content </DropdownMenuLabel>
                    <DropdownMenuItem> <Link className="flex gap-2 items-center" href="/profile/blogs/create"> <NotebookIcon/> Blog </Link> </DropdownMenuItem>
                    {user?.blogs && user.blogs.length > 0 ? 
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger> <FilePenIcon/> Document </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>  
                                {user.blogs.map((blog : BlogWithDocsBasicAndAuthorAndThumbnail) => (
                                    <DropdownMenuItem key={blog.id}> 
                                        <Link href={`/blogs/${blog.slug}/create`}>
                                            {blog.title}
                                        </Link>
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
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-foreground/50"> Welcome {user.name || "John Doe"} </p>
                        <LinkButton href="/profile" variant="ghostBg" className="!justify-start"> <UserIcon/> View Profile </LinkButton>
                    </div>
                </PopoverContent>
            </Popover>
        
        </>
    );
}