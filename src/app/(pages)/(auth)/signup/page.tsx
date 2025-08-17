"use client";
import signup from "@/actions/auth/signup";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Container from "@/components/layout/Container";
import useServerAction from "@/hooks/useServerAction";

export default function SignupPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { run, loading, error, success } = useServerAction(() => signup({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password.trim(),
            userAgent: navigator.userAgent
        }), 
        {
            unauthorizedRedirectUrl: "/profile",
            noSuccessToast: false,
        }
    );

    async function handleSignup(e : any) {

        e.preventDefault()

        // Perform server action
        run()
        
    }

    return ( <Page>

        <Container>

            <form onSubmit={handleSignup} className="flex flex-col gap-3">

                <h1 className="text-2xl">Signup</h1>

                <div>
                    {loading && <p> Loading </p>}
                    {error && <p className="text-red-400"> {error} </p>}
                    {success && <p className="text-green-600"> {success} </p>}
                </div>

                <Input
                    name="name"
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