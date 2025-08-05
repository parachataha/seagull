"use client"
// Schemas & Types
import { RootState } from "@/app/redux/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "@/components/layout/Container";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import BasicDetails from "./components/BasicDetails";

export default function page() {

    const router = useRouter();
    const user = useSelector((state : RootState) => state.user);

    useEffect(() => {

        /**
         * Redirect new users who have no slug/avatar
         */
        if (user.slug === null) {
            router.push("/profile/slug")
        }
        
    }, [user])
    
    return ( <div className="flex flex-col lg:flex-row gap-4">

        <Card className="px-5 grow">

            <h3 className="text-lg font-medium"> Edit Details </h3>

        <BasicDetails />


        </Card>


        <Card className="px-5">

            <h3 className="font-medium"> Profile Completion </h3>

        </Card>

    </div>
    );
}