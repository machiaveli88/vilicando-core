import * as React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { IPageContext } from 'vilicando-core';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';

interface IGetHasuraProps {
  ssr?: boolean;
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

interface IHasuraProvider<TCache = any>
  extends Partial<ApolloProviderProps<TCache>> {
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
  initialState?: NormalizedCacheObject;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(
  _http: HttpLink.Options,
  _ws: WebSocketLink.Configuration,
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> {
  const ssrMode = typeof window === 'undefined';
  const headers = {
    'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
  };
  const http = _http || {
    uri: process.env.GRAPHQL_HTTP,
    headers
  };
  const ws = _ws || {
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
        console.warn(`[GraphQL error]: Message: ${err.message}`)
      );

    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });

  const links = [errorLink];
  if (http)
    links.push(new HttpLink({ credentials: 'same-origin', fetch, ...http }));

  let link = ApolloLink.from(links);

  if (!ssrMode && ws) {
    const wsLink = new WebSocketLink(ws);

    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      link
    );
  }

  return new ApolloClient({
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState)
  });
}

function initApolloClient(
  http: HttpLink.Options,
  ws: WebSocketLink.Configuration,
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

// todo: ssr doesn't work
export const getHasuraProps = ({
  ssr = true,
  http,
  ws
}: IGetHasuraProps = {}) => async (
  ctx: IPageContext & {
    apolloClient: ApolloClient<any>;
  }
) => {
  const { AppTree } = ctx;

  // Initialize ApolloClient, add it to the ctx object so
  // we can use it in `PageComponent.getInitialProps`.
  const apolloClient = (ctx.apolloClient = initApolloClient(http, ws));

  // Only on the server:
  if (typeof window === 'undefined') {
    // When redirecting, the response is finished.
    // No point in continuing to render
    if (ctx.res && ctx.res.finished) {
      return {};
    }

    // Only if ssr is enabled
    if (ssr) {
      try {
        // Run all GraphQL queries
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              apolloClient
            }}
          />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }
  }

  // Extract query data from the Apollo store
  return { apolloState: apolloClient.cache.extract() };
};

export default ({
  children,
  client,
  http,
  ws,
  initialState
}: IHasuraProvider) => (
  <ApolloProvider client={client || initApolloClient(http, ws, initialState)}>
    {children}
  </ApolloProvider>
);

/* export default async function withHasura(
  PageComponent: any, // todo: remove
  { ssr = true, http, ws }: IGetHasuraProps = {}
) {
  // todo: wandert in App.jsx
  const WithHasura = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => (
    <ApolloProvider
      client={apolloClient || initApolloClient(http, ws, apolloState)}
    >
      <PageComponent
        useQuery={useQuery}
        useMutation={useMutation}
        {...pageProps}
      />
    </ApolloProvider>
  );

  if (ssr || PageComponent.getInitialProps) {
    WithHasura.getInitialProps = async (
      ctx: IPageContext & {
        apolloClient: ApolloClient<any>;
      }
    ) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProps`.
      const apolloClient = (ctx.apolloClient = initApolloClient(http, ws));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithHasura;
} */
