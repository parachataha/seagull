# Signup

[Server action](https://github.com/parachataha/seagull/blob/main/src/actions/auth/signup.ts)
<br><br> The signup function requires 4 properties: `name`, `email`, `password`
and `userAgent`.

```ts
{ 
    name: string, 
    email: string, 
    password: string, 
    userAgent: string | null 
}
```

The function first validates the data and then hashes the `password` using
`argon2`. Then the function stores the new data in the `User` table whilst also
checking if the user already exists using the SQL `unique key` rule. Then the
function calls the
[createSession](https://github.com/parachataha/seagull/blob/main/src/actions/auth/createSession.ts)
to create a session in the database and client.
[Learn more](https://github.com/parachataha/seagull/blob/main/docs/authentication/README.md).

## Calling the function

Calling the function independently

```js
const result = await signup({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
    userAgent,
});
```

Calling the function using `handleServerAction()`

```js
await handleServerAction(
    signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        userAgent,
    }),
    {
        setError: setError,
        setLoading: setLoading,
        onSuccess: (data) => {/* Handle redirects, redux states etc */},
        router,
    },
);
```

## Return values

This function returns the basic serverResponse as well as `User` and `Session`
data.

```js
{
    success: boolean,
    msg: string,
    status: number,
    data?: {            // Only passed if `success = true`
        user: { ... },
        session: { ... }
    }
}
```
