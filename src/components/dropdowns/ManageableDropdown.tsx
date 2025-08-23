"use client"
// Types
import { RootState } from "@/app/redux/store";

// Hooks
import { useSelector } from "react-redux";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";

/**
 * This component allows any user to report or perform certain actions on any item,
 * but displays extra management buttons to the owner.
 */

type ActionItem = {
    hideToOwner?: boolean;
    variant?: "destructive";
    disabled?: boolean;
    
    icon: React.ReactNode;
    label: string;
    action?: () => void;
};

type ActionGroup = {
    label?: string;
    actions: ActionItem[];
};

export default function ManageableDropdown({
    trigger = (
        <Button mode="icon" variant="ghostBg">
            <EllipsisVerticalIcon />
        </Button>
    ),

    defaultActions = [],
    ownerActions = [],

    className = "absolute right-2 top-2",
    ownerId,
}: {
    trigger?: React.ReactNode;

    defaultActions?: ActionGroup[];
    ownerActions?: ActionGroup[];

    className?: string;
    ownerId?: number;
}) {
    const user = useSelector((state: RootState) => state.user);

    const isOwner = user?.id === ownerId;

    /** Filter actions */
    const visibleDefaultGroups = defaultActions
        .map((group) => ({
            ...group,
            actions: group.actions.filter(
                (action) => !(isOwner && action.hideToOwner)
            ),
        }))
        .filter((group) => group.actions.length > 0);

    const showDefault = visibleDefaultGroups.length > 0;
    const showOwner = isOwner && ownerActions.length > 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={className} asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                {showDefault &&
                    visibleDefaultGroups.map((group, gIdx) => (
                        <div key={`default-group-${gIdx}`}>
                            {group.label && (
                                <DropdownMenuLabel>
                                    {group.label}
                                </DropdownMenuLabel>
                            )}
                            {group.actions.map((action, idx) => (
                                <DropdownMenuItem
                                    disabled={action?.disabled}
                                    variant={action?.variant}
                                    key={`default-${gIdx}-${idx}`}
                                    onClick={(e) => {
                                        action.action?.();
                                    }}

                                >
                                    {action.icon}
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                            {gIdx < visibleDefaultGroups.length - 1 && (
                                <DropdownMenuSeparator />
                            )}
                        </div>
                    ))}

                {showDefault && showOwner && <DropdownMenuSeparator />}

                {showOwner &&
                    ownerActions.map((group, gIdx) => (
                        <div key={`owner-group-${gIdx}`}>
                            {group.label && (
                                <DropdownMenuLabel>
                                    {group.label}
                                </DropdownMenuLabel>
                            )}
                            {group.actions.map((action, idx) => (
                                <DropdownMenuItem
                                    disabled={action?.disabled}
                                    variant={action?.variant}
                                    key={`owner-${gIdx}-${idx}`}
                                    onClick={(e) => {
                                        action.action?.();
                                    }}

                                >
                                    {action.icon}
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                            {gIdx < ownerActions.length - 1 && (
                                <DropdownMenuSeparator />
                            )}
                        </div>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
