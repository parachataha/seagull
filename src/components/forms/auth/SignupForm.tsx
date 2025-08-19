"use client";

// Server actions
import useServerAction from "@/hooks/useServerAction";
import signup from "@/actions/auth/signup";

// Components
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { AlertCircleIcon, CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm({ className = "" }: { className?: string }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { run, loading, error, success } = useServerAction(() => signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        userAgent: navigator.userAgent
    }), 
    {
        unauthorizedRedirectUrl: "/profile",
        noSuccessToast: false,
        onSuccess: (data) => {
            router.push("/profile")
        }
    });

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        run();
    }

    return (
    <form onSubmit={handleSignup} className={`flex flex-col gap-2 max-w-100 ${className}`}>

        <div>
            <Label>Enter name</Label>
            <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
            />
        </div>

        <div>
            <Label>Enter email</Label>
            <Input
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
        </div>

        <div>
            <Label>Enter password</Label>
            <Input
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
        </div>



        {<div className="my-1">
            {error && <Alert variant="destructive" appearance="outline">
                    <AlertIcon> <AlertCircleIcon /> </AlertIcon>
                    <AlertTitle>{error}</AlertTitle>
            </Alert>}
            {success && <Alert variant="success" appearance="outline">
                    <AlertIcon> <CheckIcon /> </AlertIcon>
                    <AlertTitle>{success}</AlertTitle>
            </Alert>}
        </div>}

        <div className="flex flex-col gap-3">
            <div className="flex">
                <Button disabled={loading} variant="neutral">
                    {loading && <LoaderCircleIcon className="animate-spin size-4" />}
                    {loading ? "Loading" : "Signup"}
                </Button>
            </div>
            
            <Link href="/login" className="!text-foreground/40"> Already have an account? Login </Link>
        </div>

    </form>
    );
}
