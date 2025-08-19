"use client"
/**
 * Fetches any user data and stores it in React Redux for universal use
 * Only to be used in /Layout.tsx
 * This function also redirects users from auth-only pages to /login
*/

// Server actions
import useServerAction from "@/hooks/useServerAction"
import validateSession from "@/actions/auth/validateSession"

// Types
import { RootState } from "@/app/redux/store"

// HHooks
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

// Pages that require auth
const authPages = ["/profile"]

// Pages that do not allow auth
const noAuthPages = ["/login", "/signup"]

export default function UserProvider() {

    const pathname = usePathname()
    const router = useRouter();
    
    const user = useSelector((state : RootState) => state.user);
    
    const { run, loading, error, success } = useServerAction(() => validateSession( navigator.userAgent ), 
        {
            noSuccessToast: true,
        }
    );

    useEffect(() => {
        run()
    }, [])

    /**
     * Automatically handle unauthorized users' redirection
     */
    useEffect(() => {

        // Make sure data isn't still fetching
        if (!loading && user.email === "") { 
            // Check if user is authenticated
            if (error) {
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