"use client";
import Page from "@/components/layout/Page";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return ( <Page>

        <form className="flex flex-col gap-2">

            <h1 className="text-2xl">Login</h1>

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

        </form>


    </Page> )
}