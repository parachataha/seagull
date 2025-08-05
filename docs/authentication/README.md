# Authentication

When logging in or signing up successfully a cookie is stored on the client's
browser. The cookie is called `session` with a `token` value formatted like so:

```
<session_id>.<session_secret>
abcdefghjkmnp234.abcdefghjkmnp234
```

This `token` is a combination of both the session `id` and `secret`. Allowing
the program to easily store all needed data in one single cookie.
<br> <br> The `id` is stored in the `Session` database table alongside with a
hashed version of the `secret` for added security. The hashed version of the
secret should never be exposed to the client. When validating a session, the
`token` is parsed (signified by the dot) to easily return both the `id` and
`secret`. The `id` is used to query the database and the client's `session`
value is hashed and compared to the `hashedSecret` stored in the database. If
the comparison is successful, the cookie is validated and the user can perform
tasks.
<br> <br> _In order for no timing attacks to take place, we use a constant-time
hash comparison validation check to ensure attackers cannot guess the session
`hashedSecret`._
<br> <br> Both `id` and `secret` are generate by the same
[generateSecureString function](https://github.com/parachataha/seagull/blob/main/src/lib/sessions/generateSecureString.ts).
This generates a long string made up of a-z, 1-9 (excluding o, 0, i, l and 1 for
clarity).

## Usage

This server action automatically runs on the client on page-load and thus should
not be used again in components in the future. In **server actions**, this
function should be used to authenticate users.

```js
/**
 * @param navigator.userAgent - Should be passed in from the parent server action from the client
 */
const result = await validateUser(navigator.userAgent);
```

## Return values

All return values follow the convention of

```js
{
    success: boolean,
    msg: string,
    status: number,
    data?: { /* ... */ }
}
```

### Potential error messages

`400` - `Invalid user agent` - When a provided user agent is not valid
<br> `401` - `Not authenticated` - If a user has no `session` cookie
<br> `401` - `Not authenticated` - If a user has no `session` cookie value
<br> `401` - `Invalid token` - If the provided session value does not match the
token schema. This also deletes the client session as a basic security measure
`<br>`401`-`Invalid
token`- If the token is valid but does not contain exactly 2 parts (id and secret)
<br>`401`-`Invalid
session`- If the token is valid but does not exist in the database
<br>`403`-`Session
devices do not
match`- If the userAgent value in the database does not match the client provided one. This helps prevent session-stealing. This also deletes the client session as a basic security measure
<br>`403`-`Invalid
session`- if the hashed client secret does not match the database stored hashedSecret. This also deletes the client session as a basic security measure
<br>`401`-`Session
expired` - The session has reached its expiry date and will thus be deleted from
the database and client

### Success message

`200` - `Session validated` - User data is provided in a `data.user` object.
