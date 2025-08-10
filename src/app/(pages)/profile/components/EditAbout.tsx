"use client"
// Types
import { RootState } from "@/app/redux/store";
import { ClientError, ClientSuccess } from "@/lib/types/Client";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Server actions
import updateAbout from "@/actions/user/update/about";
import { updateUser } from "@/app/redux/slices/userSlice";
import useServerAction from "@/hooks/useServerAction";

/**
 * A component allowing users to see their private data such as email, password
 * And give the ability to change them
 */

export default function EditAbout() {

    const user = useSelector((state : RootState) => state.user);
    const dispatch = useDispatch();

    const [about, setAbout] = useState<string>("")

    // Used to dynamically show the save button
    const [isChange, setIsChange] = useState<boolean>(false)

    const { run, loading, error, success } = useServerAction(() => updateAbout({
            oldAbout: user.about?.trim() || null,
            newAbout: about.trim() || null,
            userAgent: navigator.userAgent || null
        }),
        {
            onSuccess: (data) => {
                setIsChange(false);
            }
        }
    );

    useEffect(() => {
        setAbout(user.about || "")
    }, [user])

    /**
     * Update user about server action
     */
    async function handleUpdateAbout(e : React.FormEvent) {
        e.preventDefault()

        run()
    }
    
    return ( <Card className="bg-popover">

        <CardContent>

            <h3 className="font-semibold"> About you </h3>
            <p className="text-foreground/60"> Describe yourself and your personality </p>

            <form className="mt-3" onSubmit={handleUpdateAbout}>  

                <Label> About </Label>
                <Textarea
                    required
                    className="min-h-30 max-h-60 mb-3"
                    placeholder={user.about || "Hey, I'm new here!"} 
                    value={about}
                    onChange={(e) => {
                        setAbout(e.target.value);
                        if (e.target.value.trim() !== user.about?.trim()) { setIsChange(true) }
                        else { setIsChange(false) }
                    }}
                />
                {isChange && <Button variant="neutral"> Save </Button>}

            </form>

        </CardContent>
        
    </Card>
    );
}