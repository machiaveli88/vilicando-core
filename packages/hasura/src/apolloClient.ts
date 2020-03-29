import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split } from "apollo-link";
import { RetryLink } from "apollo-link-retry";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import fetch from "isomorphic-unfetch";
import initCache from "./initCache";
import { IContext } from "./initContext";

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(state: NormalizedCacheObject, ctx: IContext) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const ssrMode = ctx ? Boolean(ctx) : typeof window === "undefined"; // Disables forceFetch on the server (so queries are only run once)
  const headers = {
    "x-hasura-admin-secret": process.env.GRAPHQL_SECRET
  };
  const http = !!process.env.GRAPHQL_HTTP && {
    uri: process.env.GRAPHQL_HTTP,
    headers
  };
  const ws = !!process.env.GRAPHQL_WS && {
    uri: process.env.GRAPHQL_WS,
    options: {
      reconnect: true,
      connectionParams: {
        headers
      }
    }
  };

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(err =>
        console.error(`[GraphQL error]: Message: ${err.message}`)
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  let link = ApolloLink.from(
    http
      ? [
          errorLink,
          new RetryLink({ attempts: { max: Infinity } }),
          new HttpLink({ credentials: "same-origin", fetch, ...http })
        ]
      : [errorLink]
  );

  if (!ssrMode && ws)
    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      new WebSocketLink(ws),
      link
    );

  return new ApolloClient({ ssrMode, link, cache: initCache(state) });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {IContext} ctx
 */
export default function initApolloClient(
  state?: NormalizedCacheObject,
  ctx?: IContext
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") return createApolloClient(state, ctx);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(state, ctx);

  return apolloClient;
}
