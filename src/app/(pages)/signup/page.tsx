"use client";
import signup from "@/actions/auth/signup";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import handleServerAction from "@/lib/handleServerAction";
import { ClientError } from "@/lib/types/ClientError";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/redux/slices/userSlice";
import Container from "@/components/layout/Container";

export default function SignupPage() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: "" })

    async function handleSignup(e : any) {

        e.preventDefault()

        // Used to store browser information for security
        const userAgent = navigator.userAgent || null

        // Perform server action
        await handleServerAction(
            signup({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: password.trim(),
                userAgent
            }), 
            {
                setError: setError,
                setLoading: setLoading,
                onSuccess: (data) => {

                    console.log(data);
                    if (data?.user) {
                        dispatch( updateUser( data.user ) )
                    }
                    // router.push("/profile");
                    
                },
                router
            }
        )
        
    }

    return ( <Page>

        <Container>

            <form onSubmit={handleSignup} className="flex flex-col gap-3">

                <h1 className="text-2xl">Signup</h1>

                {error.isError && <p> {error.msg} </p>}
                {loading && <p> Loading </p>}

                <Input
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />

                <Input
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />

                <Input
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <Button type="submit" variant="default">Signup</Button>

            </form>
            
        </Container>



    </Page> )
}