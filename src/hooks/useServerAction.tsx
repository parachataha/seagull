import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { ServerResponse } from "../lib/types/ServerResponse";
import { updateUser } from "@/app/redux/slices/userSlice";
import { useDispatch } from "react-redux";

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
    run: () => Promise<ServerResponse<T> | void>;
    loading: boolean;
    error: string | null;
    success: string | null;
} {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const run = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await actionFn();
            console.log(result);

            if (!result.success) {
                setError(result.msg);

                if (!options?.noErrorToast) {
                    toast.error(result.msg);
                }

                if (result.status === 403) {
                    router.push(options?.unauthorizedRedirectUrl ?? "/login");
                }

                return; // ✅ void branch
            }

            setSuccess(result.msg);
            options?.onSuccess?.(result.data);

            if ((result.data as any)?.user) {
                dispatch(updateUser((result.data as any).user));
            }

            if (!options?.noSuccessToast) {
                toast.success(result.msg);
            }

            return result;
        } catch (err: any) {
            const msg = err?.message ?? "Unexpected error";
            setError(msg);

            if (!options?.noErrorToast) {
                toast.error(msg);
            }

            return { success: false, msg, status: 500 } satisfies ServerResponse<T>;
        } finally {
            setLoading(false);
        }
    }, [actionFn, options, router, dispatch]);

    return { run, loading, error, success };
}
