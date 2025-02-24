"use client"
import styles from "./signupForm.module.css"

import { useRouter } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";
import createUser from "@/lib/auth/createUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/app/redux/slices/userSlice";

export default function SignupForm() {

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
            firstName: formData.get("firstName")?.toString().toLowerCase().trim(),
            lastName: formData.get("lastName")?.toString().toLowerCase().trim(),
            email: formData.get("email")?.toString().toLowerCase().trim(),
            password: formData.get("password")?.toString().toLowerCase().trim()
        }

        if (!formValues || (!formValues.firstName && !formValues.lastName && !formValues.email && !formValues.password)) { 
            setError({ isError: true, msg: "Please fill in the form" }); return;
        }
        if (!formValues.firstName || formValues.firstName.length > 60 || formValues.firstName.length < 2) {
            setError({ isError: true, msg: "Please enter a valid first name" }); return;
        }
        if (!formValues.lastName || formValues.lastName.length > 60 || formValues.lastName.length < 2) {
            setError({ isError: true, msg: "Please enter a valid last name" }); return;
        }
        if (!formValues.email || formValues.email.length > 255 || formValues.email.length < 4 || !formValues.email.includes("@") || !formValues.email.includes(".")) {
            setError({ isError: true, msg: "Please enter a valid email" }); return;
        }
        if (!formValues.password || formValues.password.length > 255 || formValues.password.length < 8) {
            setError({ isError: true, msg: "Please enter a stronger password" }); return;
        }

        // Create user
        const result = await createUser({ 
            firstName: `${formValues.firstName.trim()}`,
            lastName: `${formValues.lastName.trim()}`,
            email: `${formValues.email.trim()}`,
            password: `${formValues.password}`
        });
        
        if (!result) {
            setError({isError: true, msg: "An error occurred"})
            return;
        }
        if (!result.success) {

            // Create valid message
            let msg = result.msg
            if (result.msg.includes("Invalid")) { msg = `Please enter a valid ${result.msg.split("Invalid ")[1]}` }
            else {
                switch (result.msg) {
                    case 'duplicate key value violates unique constraint "users_email_key"':
                        msg = "A user already exists with that email";
                        break;
                    case 'duplicate key value violates unique constraint "users_slug_key"':
                        msg = "A user already exists with that email";
                        break;
                    default:
                        msg = result.msg;
                        break;
                }
            }

            setError({isError: true, msg: msg})
            return;
        }
        
        router.push("/profile")
        dispatch(setUser(result.user ))

    }

    return <form onSubmit={handleSubmit} className={styles.form}>

        <input name='firstName' type="text" placeholder="First name"/>
        <input name='lastName' type="text" placeholder="Last name"/>
        <input name='email' type="text" placeholder="Email"/>
        <input name='password' type="text" placeholder="Password"/>
        <button>Signup</button>

        {error.isError && <div>
            <h1>Error!</h1>
            <p> {error.msg} </p>
        </div>}

    </form>
    
}