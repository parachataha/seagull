"use client"
import Name from "@/components/auth/Name";
import FullPage from "@/components/layout/FullPage";
import Container from "@/components/layout/Container";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Types
import { ClientError } from "@/lib/types/ClientError";
import { RootState } from "@/app/redux/store";
import handleServerAction from "@/lib/handleServerAction";
import updateSlug from "@/actions/user/update/slug";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/redux/slices/userSlice";

export default function page() {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state : RootState) => state.user);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess]  = useState<{isSuccess: boolean, msg: string}>({ isSuccess: false, msg: '' });

    const [slug, setSlug] = useState<string>("")

    /* Set default slug value */
    useEffect(() => { setSlug(user.name.toLowerCase().replaceAll(" ", "")) }, [user])

    async function handleSave(e : any) {
        e.preventDefault()

        await handleServerAction(
            updateSlug({ 
                oldSlug: user.slug, 
                newSlug: slug.trim().toLowerCase(), 
                userAgent: navigator.userAgent 
            }),
            {
                setLoading,
                setError,
                router,
                onSuccess: () => {
                    // Update redux
                    dispatch( updateUser({slug: slug.trim().toLowerCase()}) )

                    // Indicate to user slug is available
                    setSuccess({isSuccess: true, msg: "Slug is available..."});
                    setTimeout(() => {
                        // Indicate updated successfully
                        setSuccess({isSuccess: true, msg: "Slug updated successfully"});
                        // Redirect to profile
                        setTimeout(() => { router.push("/profile") }, 200)
                    }, 1000)

                }
            }
        )
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
                        {error.isError && <p className="text-red-500"> {error.msg} </p>}
                        {success.isSuccess && <p className="text-green-600"> {success.msg} </p>}

                        <Button disabled={loading} type="submit" className="mt-3"> {success.isSuccess ? "Saving..." : "Check Availability"} </Button>
                    </form>
                </CardContent>

            </Card>

        </Container>
        

    </FullPage>
    );
}