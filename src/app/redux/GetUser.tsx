"use client"

/**
 * 
 * Fetch user details
 * Store user details in react-redux
 * 
 */

import getCurrentSession from "./getCurrentSession";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, updateUser } from "./slices/userSlice";
import { startLoading, stopLoading, lightMode, darkMode } from "./slices/uiSlice";

export default function GetUser() {

    const dispatch = useDispatch()

    async function getUser() {
        dispatch(startLoading())
        const { user } = await getCurrentSession(); 
    
        if (user !== null) {
            dispatch(
                updateUser({ ...user, password: "", createdAt: user.createdAt?.toISOString(), userAgent: navigator.userAgent } )
            );
        }
        dispatch(stopLoading())
    }
    
    useEffect(() => {
        // USER DATA
        getUser();

        // USER PREFERENCES
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        if (theme === "dark") dispatch(darkMode())
        else dispatch(lightMode())
    }, [])

    return null;
}