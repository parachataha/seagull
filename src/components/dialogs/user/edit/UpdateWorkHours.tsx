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
import { Button } from "@/components/ui/button"
import { Input, Label } from "@/components/ui/input";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/redux/slices/userSlice";

// Server actions
import handleServerAction from "@/lib/handleServerAction";
import updateWorkHours from "@/actions/user/update/workHours";

export default function UpdateWorkHoursDialog() {

    const user = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch();
    
    // New values
    const [newWorkStart, setNewWorkStart] = useState<number>(user.startWork || 9);
    const [newWorkEnd, setNewWorkEnd] = useState<number>(user.startWork || 17);

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess] = useState<ClientSuccess>({ isSuccess: false, msg: "" })

    useEffect(() => {
        setNewWorkStart(user.startWork || 0);
        setNewWorkEnd(user.endWork || 0);
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        handleServerAction(
            updateWorkHours({
                oldWorkStart: user.startWork,
                oldWorkEnd: user.endWork,
                newWorkStart: newWorkStart,
                newWorkEnd: newWorkEnd,
                userAgent: navigator.userAgent || null
            }),
            {
                setSuccess,
                setError,
                setLoading,
                router,
                onSuccess: (data) => {
                    dispatch( updateUser({ startWork: data?.user.startWork, endWork: data?.user.endWork }) )
                }
            }
        )
        
    }


    return ( 
        <DialogContent>

            <DialogHeader>
                <DialogTitle>Edit Work Hours</DialogTitle>
                <DialogDescription>
                    Let people know your work hours to let them know when you'll most likely respond.
                    You can change this at any time or just leave it blank.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>

                <div className="flex gap-2 w-full">
                    <div className='grow'>
                        <Label> Work start time </Label>
                        <Input
                            value={newWorkStart}
                            onChange={(e) => setNewWorkStart( Number(e.target.value) )}
                            type="number"
                            placeholder="9"
                        />
                    </div>
                    <div className='grow'>
                        <Label> Work end time </Label>
                        <Input
                            value={newWorkEnd}
                            onChange={(e) => setNewWorkEnd( Number(e.target.value) )}
                            type="number"
                            placeholder="5"
                        />
                    </div>
                </div>

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