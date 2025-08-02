/**
 * A reusable frontend function that handles all repetitive logic in a single function
 */

import { ClientError } from "./types/ClientError";
import { ServerResponse } from "./types/ServerResponse";

export default async function handleServerAction<T> ( 
    action: Promise<ServerResponse<T>>, /* The server action function */
    options: {
        onSuccess: ( data?: T ) => void; /* Allow data to pass into calling component */ 
        setLoading: ( arg: boolean ) => void; /* Allow loading states to stay up-to-date */
        setError: ( arg: ClientError ) => void; /* Automatically update error states */

        unauthorizedRedirectUrl?: string /* Redirect unauthorized users to a custom URL */
        router: ReturnType<typeof import('next/navigation').useRouter> /* Allow redirection easily */
    }
) {

    // Reset states
    options.setLoading(true)
    options.setError({ isError: false, msg: "" })

    try {

        // Run the server action
        const result = await action

        // The server action had no response
        if (!result) {
            options.setError( { isError: true, msg: "An internal server error occurred" } );
            return;
        }
        
        // Handle errors
        if (!result.success) {

            options.setError( { isError: true, msg: result.msg} );
            
            // Perform correct tasks
            switch (result.status) {
                case 403: // Unauthorized to perform action
                    options.router.push( options.unauthorizedRedirectUrl ?? "/login" );
                    break;
                // TODO: Will Handle other scenarios in the future
            }

            return;

        }

        options.onSuccess(result.data)

    } catch (error : any) {

        const message = error?.message ?? 'Unexpected error'
        options.setError({ isError: true, msg: message })

    } finally {

        // Reset states
        options.setLoading(false)

    }

}