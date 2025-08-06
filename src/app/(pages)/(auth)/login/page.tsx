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
import { ClientError, ClientSuccess } from "@/lib/types/Client";
import { updateUser } from "@/app/redux/slices/userSlice";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess] = useState<ClientSuccess>({ isSuccess: false, msg: '' });

    async function handleLogin(e : React.FormEvent) {
        e.preventDefault()

        await handleServerAction(
            login({
                email: email.trim().toLowerCase(),
                password: password.trim(),
                userAgent: navigator.userAgent
            }),
            {
                setSuccess,
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

                <div>
                    {loading && <p> Loading </p>}
                    {error.isError && <p className="text-red-400"> {error.msg} </p>}
                    {success.isSuccess && <p className="text-green-600"> {success.msg} </p>}
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