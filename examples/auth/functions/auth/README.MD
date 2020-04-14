# auth-server

1. Create the following tables

- `user`:
  - `id`: UUID. Primary key. Automatically generated.
  - `username`: String. Unique user identifier.
  - `password`: String. Hashed with bcrypt.
  - `active`: Boolean. If not active, not possible to connect with this user.
- `role`:
  - `id`: UUID. Primary key. Automatically generated.
  - `name`: String. Unique role identifier.
- `user_role`:
  - `id`: UUID. Primary key. Automatically generated.
  - `role_id`: UUID. Foreign key that references the `id` of the `role` table.
  - `user_id`: UUID. Foreign key that references the `id` of the `user` table.

2. Run `yarn generate` to generate the rsa-keys.
3. Run `awk -v ORS='\\n' '1' public.pem` to show the public rsa-key. Copy it to your clipboard.
4. Add a `HASURA_GRAPHQL_JWT_SECRET`-variable to your hasura installation with the following content: `{"type": "RS256", "key": "-----BEGIN PUBLIC KEY-----PASTE HERE YOUR PUBLIC KEY-----END PUBLIC KEY-----\n"}`
5. Create a `.env`-file in the root of your project with the following content:

- `LAMBDA_URL`: the url to your auth-endpoint like `.netlify/functions` or `api`
- `LAMBDA_AUTH_ENDPOINT`: the url to your auth-endpoint like `auth`
- `HASURA_DATABASE_URL`: the connection-string of your postgres database like `postgres:@localhost:5432/postgres` (don't forget to add `?ssl=true`, if your database is not on locale)
