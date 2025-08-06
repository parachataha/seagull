/**
 * This function calls the validate user server action to check if the user is authenticaed
 *      If so, user data is returned and stored in React Redux
 * Only to be used in /components/providers/UserProvider.tsx to prevent too many database calls
 */

import validateSession from "@/actions/auth/validateSession";
import { updateUser } from "@/app/redux/slices/userSlice";
import handleServerAction from "@/lib/handleServerAction";
import { ClientError, ClientSuccess } from "@/lib/types/Client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useCurrentUser() : null {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ClientError>({ isError: false, msg: '' });
    const [success, setSuccess] = useState<ClientSuccess>({ isSuccess: false, msg: '' });

    const dispatch = useDispatch();

    /**
     * Validate the user once
    */
    useEffect(() => {
        handleValidateSession()
    }, [])

    /**
     * @function handleValidateSession()
     * Validate session and fetch user data.
     * This function runs the reusable handleServerAction() function which handles loading and error states
    */
    async function handleValidateSession() {

        await handleServerAction(
            validateSession( navigator.userAgent || null ),
            {
                setSuccess,
                setLoading,
                setError,
                router,
                onSuccess: (data) => {
                    console.log(data);
                    /**
                     * Update react redux state
                     */
                    if (data?.user) {
                        dispatch( updateUser( data.user ) )
                    }
                }
            }
        )
    }

    return null;

}