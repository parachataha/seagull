"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Types
import { RootState } from "@/app/redux/store";

export default function Container() {

    const params = useParams<{ user: string; }>()
    const user = useSelector((state: RootState) => state.user);
    const [data, setData] = useState<any>({})

    useEffect(() => {

        if (params.user === user.slug) {
            setData(user)
        }

    }, [user])


    return ( <div className="container">

        {data.firstName} {data.lastName}

    </div> )
    
}