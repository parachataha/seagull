"use client"
// Types
import { RootState } from "@/app/redux/store";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, EyeClosedIcon, FolderOutputIcon, PenIcon, PinIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Hooks
import { useDispatch, useSelector } from "react-redux";

export default function OwnerBanner ({ 
    children,
    className = "",
    authorSlug = ""
} : {
    children?: React.ReactNode,
    className?: string,
    authorSlug?: string | null | undefined
}) {

    const router = useRouter();

    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    if (authorSlug === user.slug) return ( <Card className={className} variant="accent">
        <CardContent className="flex justify-between items-center !p-2">
            <LinkButton href="edit" variant="neutral" appearance="ghost"> Edit document </LinkButton>
            <DropdownMenu> 
                <DropdownMenuTrigger asChild>
                    <Button variant="neutral" mode="icon" appearance="ghost"> <EllipsisVerticalIcon/> </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-45">
                    <DropdownMenuLabel> Doc actions </DropdownMenuLabel>
                    <Link href="edit">
                        <DropdownMenuItem> <PenIcon/> Edit doc </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem> <PinIcon/> Pin doc </DropdownMenuItem>
                    <DropdownMenuItem> <FolderOutputIcon/> Move doc </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive"> <EyeClosedIcon/> Hide doc </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive"> <Trash2Icon/> Delete doc </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardContent>
    </Card>
    );

    return null;
}