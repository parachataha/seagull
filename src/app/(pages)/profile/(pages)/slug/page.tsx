"use client"
import Name from "@/components/auth/Name";
import FullPage from "@/components/layout/FullPage";
import Container from "@/components/layout/Container";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/redux/slices/userSlice";

// Types
import { RootState } from "@/app/redux/store";

// Server actions
import updateSlug from "@/actions/user/update/slug";
import useServerAction from "@/hooks/useServerAction";

export default function page() {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state : RootState) => state.user);

    const [successMsg, setSuccessMsg] = useState<string>("")
 
    const { run, loading, error, success } = useServerAction(() => 
        updateSlug({ 
            oldSlug: user.slug, 
            newSlug: slug.trim().toLowerCase(), 
            userAgent: navigator.userAgent || null
        }),
        {
            unauthorizedRedirectUrl: "/login",
            noSuccessToast: false,
            onSuccess: () => {
                // Update redux
                dispatch( updateUser({slug: slug.trim().toLowerCase()}) )

                // Indicate to user slug is available
                setSuccessMsg("Slug is available...");
                setTimeout(() => {
                    // Indicate updated successfully
                    setSuccessMsg("Slug updated successfully");
                    // Redirect to profile
                    setTimeout(() => { router.push("/profile") }, 200)
                }, 1000)
            }
        }
    );

    const [slug, setSlug] = useState<string>("")

    /* Set default slug value */
    useEffect(() => { setSlug(user.name.toLowerCase().replaceAll(" ", "")) }, [user])

    async function handleSave(e : any) {
        e.preventDefault()

        run()
    }
    
    return ( <FullPage className="items-center justify-center flex flex-col">

        <Container className="!max-w-120">

            <Card>
                
                <CardContent>
                    <form onSubmit={handleSave}> 
                        <p className="text-foreground"> {user.slug ? "Hello" : "Welcome"} <Name className="text-foreground/50" /> </p>
                        <h1 className="mt-1 text-xl font-semibold"> Customize Your Slug </h1>

                        <div className="flex items-center relative mt-8 mb-2 rounded-md border border-input">
                            <p className="bg-foreground/5 rounded-l-md px-2 flex items-center text-sm h-10">
                                www.seagull.com/
                            </p>
                            <Input 
                                disabled={loading}
                                required
                                type="text"
                                className="rounded-l-none h-10 border-0"
                                placeholder={user.name.trim().toLowerCase().replaceAll(" ", "")}    
                                value={slug}
                                onChange={(e) => setSlug(e.target.value?.replaceAll(" ", ""))}
                            />
                        </div>

                        {/* SUCCESS/ERROR MESSAGES */}
                        {error && <p className="text-red-400"> {error} </p>}
                        {successMsg && <p className="text-green-600"> {successMsg} </p>}

                        <Button variant="secondary" disabled={loading} type="submit" className="mt-3"> {success ? "Saving..." : "Check Availability"} </Button>
                    </form>
                </CardContent>

            </Card>

        </Container>
        

    </FullPage>
    );
}