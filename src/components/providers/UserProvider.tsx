"use client"
import { RootState } from "@/app/redux/store"
/**
 * Fetches any user data and stores it in React Redux for universal use
 * Only to be used in /Layout.tsx
 * This function also redirects users from auth-only pages to /login
 */

import useCurrentUser from "@/hooks/useCurrentUser"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

// Pages that require auth
const authPages = ["/profile"]

export default function UserProvider() {

    const pathname = usePathname()
    const router = useRouter();
    
    const user = useSelector((state : RootState) => state.user);
    
    const { loading, success } = useCurrentUser()

    /**
     * Automatically handle unauthorized users' redirection
     */
    useEffect(() => {

        // Make sure data isn't still fetching
        if (!loading && user.email === "") { 
            // Check if user is authenticated
            if (!success.isSuccess) {
                authPages.forEach(page => {
                    // Automatically redirect unauthorized users away from page
                    if (pathname.startsWith(page)) {
                        router.push("/login")
                    }
                })
            }
        }

    }, [loading, user, pathname])

    return null
}