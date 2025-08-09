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
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Server actions
import updateLabel from "@/actions/user/update/label";
import useServerAction from "@/hooks/useServerAction";

export default function UpdateLabelDialog() {

    const user = useSelector((state : RootState) => state.user);
    const [newLabel, setNewLabel] = useState<string>(user.label || "")

    const { run, loading, error, success } = useServerAction(() => updateLabel({
            oldLabel: user.label?.trim() || null,
            newLabel: newLabel.trim(),
            userAgent: navigator.userAgent,
        }), 
    );

    useEffect(() => {
        setNewLabel(user.label || "")
    }, [user])

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        run()
        
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