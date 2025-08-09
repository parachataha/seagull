"use client"
// Types
import { RootState } from "@/app/redux/store";

// Components
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/input";
import { TimezoneCombobox } from "@/components/ui/comboboxes/TimezoneCombobox";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Server actions
import updateTimezone from "@/actions/user/update/timezone";
import useServerAction from "@/hooks/useServerAction";

export default function UpdateTimezoneDialog() {

    const user = useSelector((state : RootState) => state.user);
    const [newTimezone, setNewTimezone] = useState<string>(user.label || "")

    const { run, loading, error, success } = useServerAction(() => updateTimezone({
            oldTimezone: user.timezone?.trim() || null,
            newTimezone: newTimezone.trim() || null,
            userAgent: navigator.userAgent,
        }), 
    );

    useEffect(() => {
        setNewTimezone(user.timezone?.trim() || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        run()
        
    }


    return ( 
        <DialogContent>

            <DialogHeader>
                <DialogTitle>Edit Timezone</DialogTitle>
                <DialogDescription>
                    Let people know what clock you run around, this helps others identify when to message you or not. You can change this whenever or just leave it blank
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Label> Update Timezone </Label>
                <TimezoneCombobox value={newTimezone} setValue={setNewTimezone} />

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