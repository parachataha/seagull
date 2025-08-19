"use client"
// Types
import { RootState } from "@/app/redux/store";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
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
            <Link href={`/blogs/${params.blogSlug}/settings`} className="!text-foreground/50 text-sm pl-2"> 
                Manage blogs
            </Link>
            <LinkButton href={`/blogs/${params.blogSlug}/create`} variant="ghostBg"> <PlusIcon/> Document </LinkButton>
        </CardContent>
    </Card>
    );
}