import React from "react";
import { useArticlesQuery, useUserQuery } from "@graphql";
import { withHasura } from "vilicando-hasura";
import { Logout, Container } from "@components";

function ContentPage() {
  const [users] = useUserQuery();
  const user = users?.[0];
  const [articles] = useArticlesQuery();

  return !user?.id ? (
    <div>Please log in!</div>
  ) : (
    <Container>
      Logged in as {user.username} with id {user.id} and the following articles:
      <ul>
        {articles.map(({ id, title, content }) => (
          <li key={id}>
            <b>{title || "no title"}</b>: {content || "no content"}
          </li>
        ))}
      </ul>
      <Logout />
    </Container>
  );
}

export default withHasura()(ContentPage);
