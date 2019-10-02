import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const GRAPHQL_URL = 'http://localhost:8080/v1/graphql';
const GRAPHQL_SECRET = 'vilicando_secure';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      headers: {
        'x-hasura-admin-secret': GRAPHQL_SECRET
      },
      cache: new InMemoryCache().restore(initialState || {})
    })
);
