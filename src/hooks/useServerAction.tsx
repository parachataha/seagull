import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { ServerResponse } from "../lib/types/ServerResponse";
import { updateUser } from "@/app/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Button, useToast } from "@once-ui-system/core";

interface UseServerActionOptions<T> {
    onSuccess?: (data?: T) => void; /* Allow data to pass into calling component */ 
    unauthorizedRedirectUrl?: string;
    noSuccessToast?: boolean;
    noErrorToast?: boolean;
}

export default function useServerAction<T>(
    actionFn: () => Promise<ServerResponse<T>>, 
    options?: UseServerActionOptions<T>
) : { 
    run: () => Promise<ServerResponse<T> | { success: false; msg: string; status: number, data: T } | void>;
    loading: boolean;
    error: string | null;
    success: string | null;
} {

    const dispatch = useDispatch()
    // Loading state for indicating action in progress
    const [loading, setLoading] = useState(false);
    // Error message state
    const [error, setError] = useState<string | null>(null);
    // Success message state
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const run = useCallback(async () => {

        /**
         * Reset all states before running the action
         */
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            /**
             * Run the server action function passed as a parameter
             */

            const result = await actionFn();

            console.log(result)

            // If server response indicates failure
            if (!result.success) {
                setError(result.msg);

                console.log("errorrr")

                if (!options?.noErrorToast) {
                    console.log("errorrr")
                    toast.error(`${result.msg}`);
                }

                // Handle unauthorized access by redirecting
                if (result.status === 403) {
                    router.push(options?.unauthorizedRedirectUrl ?? "/login");
                }

                return;
            }

            // On success, update success state and optionally call onSuccess callback
            setSuccess(result.msg);
            options?.onSuccess?.(result.data);
            if ((result.data as any)?.user) {
                dispatch(updateUser((result.data as any).user));
            }

            // If no success toast option is set, skip the toast display
            if (options?.noSuccessToast) {
                return;
            }

            // Return the full result for further handling if needed
            return result;

        } catch (err: any) {
            // Handle unexpected errors and update error state and toast
            const msg = err?.message ?? "Unexpected error";
            setError(msg);

            if (!options?.noErrorToast) {
                toast.success(msg);
            }

            return { success: false, msg, status: 500 };
        } finally {
            // Reset loading state after completion
            setLoading(false);
        }
    }, [actionFn, options, router, dispatch]);

    // Return the run function and states for use in components
    return { run, loading, error, success };
}
