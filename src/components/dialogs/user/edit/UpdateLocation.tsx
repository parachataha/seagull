"use client"
// Types
import { RootState } from "@/app/redux/store";
import { ClientError, ClientSuccess } from "@/lib/types/Client";

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

import { updateUser } from "@/app/redux/slices/userSlice";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Server actions
import handleServerAction from "@/lib/handleServerAction";
import updateLocation from "@/actions/user/update/location";

export default function UpdateLocationDialog() {

    const user = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch();
    const [newLocation, setNewLocation] = useState<string>(user.label || "")

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess] = useState<ClientSuccess>({ isSuccess: true, msg: "" })

    useEffect(() => {
        setNewLocation(user.location || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        handleServerAction(
            updateLocation({
                oldLocation: user.location?.trim() || null,
                newLocation: newLocation.trim() || null,
                userAgent: navigator.userAgent,
            }),
            {
                setSuccess,
                setError,
                setLoading,
                router,
                onSuccess: (data) => {
                    if (data && data.user) {
                        dispatch( updateUser({location : data?.user?.location}) )
                    }
                }
            }
        )
        
    }
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
                Let people know where you're base. You can change this as much at anytime or just keep it blank.
            </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <Label> Update Location </Label>
            <Input
                disabled={loading}
                required
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                type="text"
                name="location"
                placeholder="London, UK"
            />

            <div className="mt-3">
                {error.isError && <p className="text-red-400"> {error.msg} </p>}
                {success.isSuccess && <p className="text-green-600"> {success.msg} </p>}
            </div>

            <div className="mt-4 flex gap-2">
                <Button disabled={loading} type="submit" variant="neutral"> Save </Button>
            </div>
        </form>
        
    </DialogContent>
    );
}