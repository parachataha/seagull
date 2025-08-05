"use client";
// Server actions
import login from "@/actions/auth/login";
import handleServerAction from "@/lib/handleServerAction";

// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Types
import { ClientError } from "@/lib/types/ClientError";
import { updateUser } from "@/app/redux/slices/userSlice";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });

    async function handleLogin(e : React.FormEvent) {
        e.preventDefault()

        await handleServerAction(
            login({
                email: email.trim().toLowerCase(),
                password: password.trim(),
                userAgent: navigator.userAgent
            }),
            {
                setError,
                setLoading,
                router,
                onSuccess: (data) => {
                    if (data?.user) {
                        dispatch( updateUser( { ...data.user } ) );
                    }
                }
            }
        )
    }

    return ( <Page>

        <Container>

            <form onSubmit={handleLogin} className="flex flex-col gap-2">

                <h1 className="text-2xl">Login</h1>

                {error.isError && <p> {error.msg} </p>}
                {loading && <p> Loading </p>}

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