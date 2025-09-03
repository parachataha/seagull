"use client"
/**
 * Used at the top of every profile page to display the user details and breadcrumbs
 */

// Types
import { RootState } from "@/app/redux/store";
import UserAvatar from "@/components/images/UserAvatar";

// Components
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { LayoutDashboardIcon } from "lucide-react";

// Hooks
import { useSelector } from "react-redux";


interface Breadcrumb {
    label: string;
    href: string | null;
}

export default function PageHeader ( {
    breadcrumbs,
    className = "",
} : {
    breadcrumbs: Breadcrumb[] | [];
    className?: string;
} ) {

    const user = useSelector((state : RootState) => state.user);
    
    return ( <div className={`flex justify-between items-center gap-2 ${className}`}>
        
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/profile">
                        <LayoutDashboardIcon className="size-4" />
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>

                        <BreadcrumbItem>
                            <BreadcrumbLink href={breadcrumb.href || ""}> {breadcrumb.label} </BreadcrumbLink>
                        </BreadcrumbItem>

                        {index + 1 < breadcrumbs.length && <BreadcrumbSeparator />}

                    </React.Fragment>
                ))}
                
            </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2 text-sm">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="!py-2">
                        <UserAvatar
                            className="w-6 h-6"
                            src={user.avatar.url}
                            name={user.name || "John Doe"}
                            />
                        <p className="ml-1"> {user.name || "John Doe"} </p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    </div>
    );
}