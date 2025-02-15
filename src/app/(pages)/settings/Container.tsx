"use client"
import logoutUser from "@/lib/auth/logoutUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Redux
import { clearUser } from "@/app/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Container() {

    const router = useRouter()
    const dispatch = useDispatch()
    const [error, setError] = useState<{isError: Boolean, msg: string}>({isError: false, msg: "An error occurred"})

    async function handleLogout() {

        setError({isError: false, msg: "Loading"})
        const result = await logoutUser()

        if (!result) { 
            setError({isError: true, msg: "Please try again"});
            return;
        }
        if (!result.success){
            setError({isError: true, msg: result.msg || "An error occurred"});
            return;
        }

        dispatch(clearUser())
        router.push("/login")

    }

    return ( <div className="container">

        <button onClick={handleLogout}> Log out </button>

        {error.isError && <div> 
            Error!
            <p> {error.msg} </p>
        </div>}

    </div> )
}