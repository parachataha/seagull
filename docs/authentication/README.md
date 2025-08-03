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
