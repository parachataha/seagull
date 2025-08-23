"use client"
// Types
import { RootState } from "@/app/redux/store";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EyeClosedIcon, FolderOutputIcon, PenIcon, PinIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function OwnerBanner ({ 
    children,
    className = ""
} : {
    children?: React.ReactNode,
    className?: string
}) {

    const params = useParams<{ blogSlug: string; }>()

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    return ( <Card className={className} variant="accent">
        <CardContent className="flex justify-between items-center !p-2">
            <DropdownMenu> 
                <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer !text-foreground/50 text-sm pl-2 active:bg-foreground/5"> Manage blog </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-45">
                    <DropdownMenuLabel> Blog actions </DropdownMenuLabel>
                    <DropdownMenuItem> <PenIcon/> Edit details </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive"> <EyeClosedIcon/> Unlist blog </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuLabel> Doc actions </DropdownMenuLabel>
                    <DropdownMenuItem> <PinIcon/> Pin doc </DropdownMenuItem>
                    <DropdownMenuItem> <FolderOutputIcon/> Move doc </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive"> <Trash2Icon/> Delete doc </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <LinkButton href={`/blogs/${params.blogSlug}/create`} variant="ghostBg"> <PlusIcon/> Document </LinkButton>
        </CardContent>
    </Card>
    );
}