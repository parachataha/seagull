"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"

// Types
import { RootState } from "@/app/redux/store";
import { useEffect } from "react";

export default function Container() {

    const router = useRouter()
    const pathname = usePathname()
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {

        const targetPath = `/user/${user.slug}`

        if (user.id && pathname !== targetPath) {
            router.push(`/user/${user.slug}`)

        }

    }, [user, router, pathname])

    return ( <> </> )
}