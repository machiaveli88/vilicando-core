import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';
import initCache from './initCache';

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(
  _http: HttpLink.Options,
  _ws: WebSocketLink.Configuration,
  initialState: NormalizedCacheObject
) {
  const ssrMode = typeof window === 'undefined'; // Disables forceFetch on the server (so queries are only run once)
  const headers = {
    'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
  };
  const http =
    _http ||
    (process.env.GRAPHQL_HTTP
      ? {
          uri: process.env.GRAPHQL_HTTP,
          headers
        }
      : undefined);
  const ws =
    _ws ||
    (process.env.GRAPHQL_WS
      ? {
          uri: process.env.GRAPHQL_WS,
          options: {
            reconnect: true,
            connectionParams: {
              headers
            }
          }
        }
      : undefined);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(err =>
        console.warn(`[GraphQL error]: Message: ${err.message}`)
      );

    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });

  let link = ApolloLink.from(
    http
      ? [
          errorLink,
          new RetryLink({ attempts: { max: Infinity } }),
          new HttpLink({ credentials: 'same-origin', fetch, ...http })
        ]
      : [errorLink]
  );

  if (!ssrMode && ws)
    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      new WebSocketLink(ws),
      link
    );

  return new ApolloClient({ ssrMode, link, cache: initCache(initialState) });
}

export default function initApolloClient(
  http?: HttpLink.Options,
  ws?: WebSocketLink.Configuration,
  initialState?: NormalizedCacheObject
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined')
    return createApolloClient(http, ws, initialState);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(http, ws, initialState);

  return apolloClient;
}
