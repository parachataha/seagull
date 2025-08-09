"use client";
// Server actions
import login from "@/actions/auth/login";
import useServerAction from "@/hooks/useServerAction";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const { run, loading, error, success } = useServerAction(() => login({
        email: email.trim().toLowerCase(),
        password: password.trim(),
        userAgent: navigator.userAgent
    }), {
        unauthorizedRedirectUrl: "/profile",
    }
    );

    async function handleLogin(e : React.FormEvent) {
        e.preventDefault()

        run()
    }

    return ( <Page>

        <Container>

            <form onSubmit={handleLogin} className="flex flex-col gap-2">

                <h1 className="text-2xl">Login</h1>

                <div>
                    {loading && <p> Loading </p>}
                    {error && <p className="text-red-400"> {error} </p>}
                    {success && <p className="text-green-600"> {success} </p>}
                </div>

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

                <Button variant="neutral">Login</Button>

            </form>

        </Container>

    </Page> )
}