"use client"
// Types
import { RootState } from "@/app/redux/store";

// Components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientError } from "@/lib/types/ClientError";
import Link from "next/link";
import handleServerAction from "@/lib/handleServerAction";
import updateLabel from "@/actions/user/update/label";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/redux/slices/userSlice";

export default function UpdateLabelDialog() {

    const user = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch();
    const [newLabel, setNewLabel] = useState<string>(user.label || "")

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });

    useEffect(() => {
        setNewLabel(user.label || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        handleServerAction(
            updateLabel({
                oldLabel: user.label?.trim() || null,
                newLabel: newLabel.trim(),
                userAgent: navigator.userAgent,
            }),
            {
                setError,
                setLoading,
                router,
                onSuccess: (data) => {
                    dispatch( updateUser({label : data?.user.label}) )
                }
            }
        )
        
    }
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle>Edit label</DialogTitle>
            <DialogDescription>
                Describe yourself and your roles. You can change this as much at anytime
            </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <Label> Update label </Label>
            <Input
                disabled={loading}
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                type="text"
                name="name"
                placeholder="A cool teacher"
            />

            <div className="mt-4 flex gap-2">
                <Button disabled={loading} type="submit" variant="neutral"> Save </Button>
            </div>
        </form>
        
    </DialogContent>
    );
}