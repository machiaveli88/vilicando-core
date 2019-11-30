import React from 'react';
import Head from 'next/head';
import { IPageContext } from 'vilicando-core';
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  split,
  getMainDefinition,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  HttpOptions
} from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';
import { ApolloProviderProps } from '@apollo/client/react/context/ApolloProvider';

interface IGetHasuraProps {
  ssr?: boolean;
  http?: HttpOptions;
  ws?: WebSocketLink.Configuration;
}

interface IHasuraProvider<TCache = any>
  extends Partial<ApolloProviderProps<TCache>> {
  http?: HttpOptions;
  ws?: WebSocketLink.Configuration;
  initialState?: NormalizedCacheObject;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(
  _http: HttpOptions,
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

  let link = ApolloLink.from(
    http ? [new HttpLink({ credentials: 'same-origin', fetch, ...http })] : []
  );

  if (!ssrMode && ws) {
    const wsLink = new WebSocketLink(ws) as any; // todo: remove any

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
  http: HttpOptions,
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
}: IGetHasuraProps = {}) => async ({
  AppTree,
  apolloClient,
  res
}: IPageContext & {
  apolloClient: ApolloClient<any>;
}) => {
  // Initialize ApolloClient, add it to the ctx object so
  // we can use it in `PageComponent.getInitialProps`.
  apolloClient = initApolloClient(http, ws);

  // Only on the server:
  if (typeof window === 'undefined') {
    // When redirecting, the response is finished.
    // No point in continuing to render
    if (res && res.finished) {
      return {};
    }

    // Only if ssr is enabled
    if (ssr) {
      try {
        // Run all GraphQL queries
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(<AppTree pageProps={{ apolloClient }} />);
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

/* export async function withHasura(
  PageComponent: any,
  { ssr = true, http, ws }: IGetHasuraProps = {}
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
