"use client"
/**
 * Fetches any user data and stores it in React Redux for universal use
 * Only to be used in /Layout.tsx
 */

import useCurrentUser from "@/hooks/useCurrentUser"

export default function UserProvider() {

    useCurrentUser()

    return null
}