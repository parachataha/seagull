"use client"

/**
 * 
 * Fetch user details
 * Store user details in react-redux
 * 
 */

import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setUser } from "./slices/userSlice";
import { startLoading, stopLoading } from "./slices/uiSlice";

export default function GetUser() {

    const dispatch = useDispatch()

    async function getUser() {
        dispatch(startLoading())
        const { user } = await getCurrentSession();
    
        if (user !== null) {
            dispatch(setUser({ ...user, createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null }));
        }
        dispatch(stopLoading())
    }
    

    useEffect(() => {
        getUser()
    })

    return null;
}