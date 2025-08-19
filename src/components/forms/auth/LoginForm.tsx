"use client";

// Server actions
import login from "@/actions/auth/login";
import useServerAction from "@/hooks/useServerAction";

// Components
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { AlertCircleIcon, CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ className = "" }: { className?: string }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { run, loading, error, success } = useServerAction(
    () =>
        login({
            email: email.trim().toLowerCase(),
            password: password.trim(),
            userAgent: navigator.userAgent,
        }),
    {
        unauthorizedRedirectUrl: "/profile",
        onSuccess: () => router.push("/profile"),
    }
    );

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        run();
    }

    return (
    <form onSubmit={handleLogin} className={`flex flex-col gap-2 max-w-100 ${className}`}>

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
            <Button disabled={loading} variant="neutral">
                {loading && <LoaderCircleIcon className="animate-spin size-4" />}
                {loading ? "Loading" : "Login"}
            </Button>
            
            <Link href="/signup" className="!text-foreground/40"> Don't have an account? Signup now </Link>
        </div>

    </form>
    );
}
