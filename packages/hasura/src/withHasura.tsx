import React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';
import { IPageContext } from 'vilicando-core';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

interface IWithHasuraProps {
  ssr?: boolean;
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function initCache(initialState: NormalizedCacheObject) {
  const cache = new InMemoryCache().restore(initialState || {});

  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >
    });
  }

  return cache;
}

function createApolloClient(
  _http: HttpLink.Options,
  _ws: WebSocketLink.Configuration,
  initialState: NormalizedCacheObject
) {
  const ssrMode = typeof window === 'undefined'; // Disables forceFetch on the server (so queries are only run once)
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

export default function withHasura(
  PageComponent: any,
  { ssr = true, http, ws }: IWithHasuraProps = {}
) {
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
      <PageComponent {...pageProps} />
    </ApolloProvider>
  );

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withHasura HOC only works with PageComponents.');
    }

    WithHasura.displayName = `withHasura(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithHasura.getInitialProps = async ({
      AppTree,
      apolloClient,
      res,
      ...rest
    }: IPageContext & {
      apolloClient: ApolloClient<any>;
    }) => {
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProps`.
      apolloClient = initApolloClient(http, ws);

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps({
          AppTree,
          res,
          ...rest
        });
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
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
}
