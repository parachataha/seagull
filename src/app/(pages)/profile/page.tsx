"use client"
// Schemas & Types
import { RootState } from "@/app/redux/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "@/components/layout/Container";
import { useRouter } from "next/navigation";

export default function page() {

    const router = useRouter();
    const user = useSelector((state : RootState) => state.user);

    useEffect(() => {

        /**
         * Redirect new users who have no slug/avatar
         */
        if (user.slug === null) {
            router.push("/profile/slug")
        } else if (user.avatarUrl === null) {
            router.push("/profile/avatar")
        }
        
    }, [user])
    
    return ( <Container>
        
        <h1 className="text-2xl font-semibold"> Profile </h1>

    </Container>
    );
}