import React from "react";
import { useTheme } from "@theme";
import { useAuth } from "vilicando-hasura";
import Button from "./Button";
import Logout from "./Logout";
import { useRouter } from "vilicando-core";

export default function Login() {
  const theme = useTheme();
  const { login, session } = useAuth();
  const { push } = useRouter();

  const onSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/auth/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const { errors, ...user } = await response.json();

      if (errors)
        throw Error(
          Array.isArray(errors)
            ? errors.map(({ msg }: any) => msg).join(", ")
            : errors
        );

      login(user.token).then(() => {
        console.info("Successfully logged in!", user);
        push("/content");
      });
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          id="username"
          name="username"
          placeholder="username"
          disabled={!!session.name}
          value={session.name}
        />
        <input id="password" name="password" placeholder="password" />
        <Button type="submit">Login</Button> {!session.isExpired && <Logout />}
      </form>

      <style jsx>
        {`
          input {
            display: block;
            margin-bottom: ${theme.spacing.xs}px;
          }
        `}
      </style>
    </>
  );
}
