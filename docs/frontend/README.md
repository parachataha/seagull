# Frontend

The frontend handles all the UI displayed to the user. However, when any backend
server actions are required in a client component, the `useServerAction` hook is
required.

## `useServerAction` Usage

```tsx
import useServerAction from "@/hooks/userServerAction";
import serverAction from "@/actions/...";

const { run, loading, error, success } = useServerAction(() =>
    serverAction({
        /* Params here */
        userAgent: navigator.userAgent,
    }), {
    /** Options here **/
    onSuccess: (data) => {},
    unauthorizedRedirectUrl: "/",
    noSuccessToast: true,
    noErrorToast: true,
});
```

### Options

| Parameter               | Type                | Description                                                              |
| ----------------------- | ------------------- | ------------------------------------------------------------------------ |
| onSuccess               | (data?: T) => void? | A function ran if the server action is successful                        |
| unauthorizedRedirectUrl | string?             | Used to customize the error status 403 redirect from /login to elsewhere |
| noSuccessToast          | boolean?            | To disable success toasts                                                |
| noErrorToast            | boolean?            | Disable error toasts                                                     |

## Return values

| Value   | Type           |
| ------- | -------------- |
| Run     | ServerResponse |
| loading | boolean        |
| success | boolean        |
| error   | boolean        |
