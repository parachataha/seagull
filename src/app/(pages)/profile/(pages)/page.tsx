"use client"
// Schemas & Types
import { RootState } from "@/app/redux/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "@/components/layout/Container";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import BasicDetails from "./components/BasicDetails";
import PersonalData from "./components/PersonalDetails";
import EditAbout from "./components/EditAbout";

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
    
    return ( 

        <Card className="grow">

            <CardContent className="flex flex-col gap-4">

                <div>
                    <h3 className="text-lg font-medium mb-0.5"> Edit Details </h3>
                    <p className="text-foreground/50"> Update people who you are and what you do </p>
                </div>

                <BasicDetails className="!bg-popover" />

                <PersonalData />

                <EditAbout />

            </CardContent>

        </Card>

    );
}