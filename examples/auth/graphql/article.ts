import gql from "graphql-tag";

export const QUERY_ARTICLE = gql`
  query articles {
    article {
      id
      title
      content
    }
  }
`;
