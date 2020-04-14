import React from "react";
import { Login, Container } from "@components";
import { useTheme } from "@theme";
import { withHasura } from "vilicando-hasura";

function StartPage() {
  const theme = useTheme();

  return (
    <>
      <h1>Auth</h1>
      <p>See console for feedback!</p>

      <Container>
        <Login />
      </Container>

      <h3>Requirements</h3>
      <p>For more informations about lambda see the lambda-example!</p>
      <p>For setting up the db see the hasura-example!</p>

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

export default withHasura()(StartPage);
