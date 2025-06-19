"use client"

import signup from "@/api/actions/auth/signup"

import validateEmail from "@/utils/validation/email"
import validateName from "@/utils/validation/name"
import validatePassword from "@/utils/validation/password"

import { updateUser } from "@/app/redux/slices/userSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

export default function SignupForm() {

    const [error, setError] = useState({ isError: false, msg: "" });
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const router = useRouter()

    async function handleSignup(e : any) {

        e.preventDefault()

        setError({isError: false, msg: ""})

        if (!validateEmail(email)) { setError({isError: true, msg: "Invalid email"}); return; } 
        if (!validateName(first)) { setError({isError: true, msg: "Invalid first name"}); return; } 
        if (!validateName(last)) { setError({isError: true, msg: "Invalid last name"}); return; } 
        if (!validatePassword(password)) { setError({isError: true, msg: "Invalid password"}); return; } 

        const data = { 
            firstName: first,
            lastName: last,
            email: email,
            password: password,
            userAgent: navigator.userAgent ?? ""
        }

        const result = await signup(data)

        if (!result.success) { setError({isError: true, msg: result.msg}); return; }

        dispatch( updateUser({...result.user, createdAt: result.user?.createdAt?.toISOString()}) )

        router.push("/profile")

        console.log(result)

    }
    
    return ( <form onSubmit={handleSignup} className='flex flex-col gap-2 items-start justify-center'>

        <div className="flex gap-2">
            <div className='flex flex-col'>
                <label htmlFor="">First name</label>
                <input value={first} onChange={(e) => setFirst(e.target.value)} type="text" placeholder="John"/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Last name</label>
                <input value={last} onChange={(e) => setLast(e.target.value)} type="text" placeholder="Doe"/>
            </div>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@example.com"/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder=""/>
        </div>

        {error.isError && <div className="text-red-500 py-3"> {error.msg} </div>}

        <button type='submit' className="cursor-pointer"> Signup </button>

    </form> )

} 