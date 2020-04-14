import React from "react";
import { useTheme } from "@theme";
import { useArticlesQuery, useUserQuery } from "@graphql";
import { withHasura, useAuth } from "vilicando-hasura";

function StartPage() {
  const theme = useTheme();
  const { login, logout } = useAuth();
  const [articles] = useArticlesQuery();
  const [users] = useUserQuery();
  const user = users?.[0];

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

      login(user.token).then(() =>
        console.info("Successfull logged in!", user)
      );
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
    }
  }, []);
  const onClick = React.useCallback(() => {
    logout().then(() => console.log("Successfull logged out!"));
  }, []);

  return (
    <>
      <h1>Auth</h1>
      <p>See console for feedback!</p>
      <div>
        {!user?.id ? (
          <form onSubmit={onSubmit}>
            <input id="username" name="username" placeholder="username" />
            <input id="password" name="password" placeholder="password" />

            <button type="submit">login</button>
          </form>
        ) : (
          <>
            Logged in as {user.username} with id {user.id} and the following
            articles:
            <ul>
              {articles.map(({ id, title, content }) => (
                <li key={id}>
                  <b>{title || "no title"}</b>: {content || "no content"}
                </li>
              ))}
            </ul>
            <button onClick={onClick}>logout</button>
          </>
        )}
        <style jsx>
          {`
            div {
              background-color: ${theme.palette.primary[1]};
              padding: ${theme.spacing.md}px;
              width: 100%;
            }
            input {
              display: block;
              margin-bottom: ${theme.spacing.xs}px;
            }
            button {
              background-color: ${theme.palette.primary.base};
              border-color: ${theme.palette.primary.base};
              color: ${theme.palette.primary.text};
            }
          `}
        </style>
      </div>
      <h3>Requirements</h3>
      <p>For more informations about lambda see the lambda-example!</p>
      <p>For setting up the db see the hasura-example!</p>
    </>
  );
}

export default withHasura()(StartPage);
