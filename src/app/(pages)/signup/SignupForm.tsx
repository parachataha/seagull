"use client"
// Types
import { RootState } from "@/app/redux/store";

// 
import createUser from "@/api/user/createUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {

    const [error, setError] = useState({isError: false, msg: ""})
    const router = useRouter()

    async function handleSubmit(e : any) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        const data : {firstName: string, lastName: string, password: string, email: string, userAgent: string} = {
            firstName: `${formValues.firstName}`.trim(), 
            lastName: `${formValues.lastName}`.trim(),
            password: `${formValues.password}`.trim(), 
            email: `${formValues.email}`.trim(),
            userAgent: navigator.userAgent
        }
        
        const result = await createUser(data)
        console.log(result)

        if (result.success) {
            setError({isError: false, msg: result.msg})
            router.push("/profile")
        } else {
            setError({isError: true, msg: result.msg})
        }

    }

    return ( <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-4'>

        <div className="grid grid-cols-2 w-full gap-4">
            <div className='flex flex-col'>
                <label className='pb-1' htmlFor="first_name">First Name</label>
                <input required name='firstName' className="grow " type="text" placeholder="John"/>
            </div>
            <div className='flex flex-col'>
                <label className='pb-1' htmlFor="last_name">Last Name</label>
                <input required name='lastName' className="grow " type="text" placeholder="Doe"/>
            </div>
        </div>

        <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input required name='email' type="text" placeholder="example@example.com"/>
        </div>

        <div className="flex flex-col mb-2">
            <label htmlFor="password">Password</label>
            <input required name='password' type="password" placeholder="•••••••••••"/>
        </div>  

        {error.isError && <div>
            <p className="text-red-500"> {error.msg} </p>    
        </div>}
        <button type='submit' className='mt-2 button !bg-foreground text-background'> Signup </button>

    </form> )
}