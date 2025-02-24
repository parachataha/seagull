"use client"
import styles from "./loginForm.module.css"

import { useRouter } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";
import loginUser from "@/lib/auth/loginUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/app/redux/slices/userSlice";

export default function LoginForm() {

    const router = useRouter()
    const [error, setError] = useState<{isError: boolean, msg: string}>({isError: false, msg: ""})
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.user);

    async function handleSubmit(e: React.FormEvent | any) {
        
        e.preventDefault()
        setError({ isError: false, msg: "" })

        // Redirect authenticated users
        const { user } = await getCurrentSession()
        if ( user ) {
            router.push("/")
            setError({isError: true, msg: "You're already logged in"})
            return;
        } 

        // Get form data
        const formData = new FormData(e.target);

        let formValues = {
            email: formData.get("email")?.toString().toLowerCase().trim(),
            password: formData.get("password")?.toString().toLowerCase().trim()
        }

        if (!formValues || (!formValues.email && !formValues.password)) { 
            setError({ isError: true, msg: "Please fill in the form" }); return;
        }
        if (!formValues.email || formValues.email.length > 255 || formValues.email.length < 4 || !formValues.email.includes("@") || !formValues.email.includes(".")) {
            setError({ isError: true, msg: "Please enter a valid email" }); return;
        }
        if (!formValues.password || formValues.password.length > 255 || formValues.password.length < 8) {
            setError({ isError: true, msg: "Please enter a stronger password" }); return;
        }

        const result = await loginUser({ 
            email: `${formValues.email}`,
            password: `${formValues.password}`,
        });
        
        if (!result) {
            setError({isError: true, msg: "An error occurred"})
            return;
        }
        if (result.success === false || !result.user) {
            let msg = result.msg

            setError({isError: true, msg: msg})
            return;
        }
        
        router.push("/profile")
        dispatch(setUser(result.user))
    }

    return <form onSubmit={handleSubmit} className={styles.form}>

        <input name='email' type="text" placeholder="Email"/>
        <input name='password' type="text" placeholder="Password"/>
        <button>Signup</button>

        {error.isError && <div>
            <h1>Error!</h1>
            <p> {error.msg} </p>
        </div>}

    </form>
    
}