"use client"
/**
 * 
 * Fetch user details
 * Store user details in react-redux
 * 
 */

import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";

import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import { useEffect } from "react";

export default function GetUser() {

    const dispatch = useDispatch()

    async function getUser() {
        const { user } = await getCurrentSession();
        if (user !== null) {
            dispatch(setUser({
                id: user.id, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email, 
                slug: user.slug,
                tags: user.tags,
                about: user.about,
                followersCount: user.followersCount,
                followingCount: user.followingCount
            }))
        }
    }

    useEffect(() => {
        getUser()
    })

    return null;
}