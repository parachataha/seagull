"use client"
// Types
import { RootState } from "@/app/redux/store";
import { ClientError, ClientSuccess } from "@/lib/types/Client";

// Components
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Server actions
import updateLocation from "@/actions/user/update/location";
import useServerAction from "@/hooks/useServerAction";

export default function UpdateLocationDialog() {

    const user = useSelector((state : RootState) => state.user);
    const [newLocation, setNewLocation] = useState<string>(user.label || "")

    // Handle the server action
    const { run, loading, error, success } = useServerAction(() => updateLocation({
            oldLocation: user.location?.trim() || null,
            newLocation: newLocation.trim(),
            userAgent: navigator.userAgent,
        }), 
    );

    useEffect(() => {
        setNewLocation(user.location || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        run()
    }
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
                Let people know where you're based. You can change this as much at anytime or just keep it blank.
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
                {error && <p className="text-red-400"> {error} </p>}
                {success && <p className="text-green-600"> {success} </p>}
            </div>

            <div className="mt-4 flex gap-2">
                <Button disabled={loading} type="submit" variant="neutral"> Save </Button>
            </div>
        </form>
        
    </DialogContent>
    );
}