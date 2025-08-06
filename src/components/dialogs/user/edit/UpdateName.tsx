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
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateNameDialog() {

    const [newName, setNewName] = useState<string>("")
    const user = useSelector((state : RootState) => state.user);

    async function handleSubmit() {

    }
    
    return ( <DialogContent>

        <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
            <DialogDescription>
                This action will alert staff to ensure no malicious acts are occurring.
                You are required to provide a reason for security reasons and approval may take time.
            </DialogDescription>
        </DialogHeader>
        <div>
            <Label> Enter new name </Label>
            <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                name="name"
                placeholder={user.name}
            />
            <Button variant="secondary" className="mt-4"> Save new name </Button>
        </div>
        
    </DialogContent>
    );
}