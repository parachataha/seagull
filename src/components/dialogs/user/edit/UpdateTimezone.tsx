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

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientError, ClientSuccess } from "@/lib/types/Client";
import handleServerAction from "@/lib/handleServerAction";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/redux/slices/userSlice";
import updateTimezone from "@/actions/user/update/timezone";
import { TimezoneCombobox } from "@/components/ui/comboboxes/TimezoneCombobox";

export default function UpdateTimezoneDialog() {

    const user = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch();
    const [newTimezone, setNewTimezone] = useState<string>(user.label || "")

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess] = useState<ClientSuccess>({ isSuccess: false, msg: "" })

    useEffect(() => {
        setNewTimezone(user.timezone?.trim() || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        handleServerAction(
            updateTimezone({
                oldTimezone: user.timezone?.trim() || null,
                newTimezone: newTimezone.trim() || null,
                userAgent: navigator.userAgent,
            }),
            {
                setSuccess,
                setError,
                setLoading,
                router,
                onSuccess: (data) => {
                    dispatch( updateUser({timezone : data?.user.timezone}) )
                }
            }
        )
        
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