import React, { useMemo } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

declare type _ApolloClient = ApolloClient<any> & { createCache: any };

let apolloClient: _ApolloClient = null;

function initApolloClient(
  apolloConfig: _ApolloClient,
  initialState = {}
): ApolloClient<any> {
  // Make sure to create a new client for every server-side request so that data isn't shared between connections (which would be bad)
  // Reuse client on the client-side
  if (typeof window === 'undefined' || !apolloClient) {
    return createApolloClient(apolloConfig, initialState);
  }

  return apolloClient;
}

function createApolloClient(
  apolloConfig: _ApolloClient,
  initialState = {}
): ApolloClient<any> {
  const createCache = apolloConfig.createCache || (() => new InMemoryCache());
  const browser = typeof window !== 'undefined';

  const config = {
    connectToDevTools: browser,
    ssrMode: !browser, // Disables forceFetch on the server (so queries are only run once)
    cache: createCache().restore(initialState || {}),
    ...apolloConfig
  };

  delete config.createCache;

  return new ApolloClient(config);
}

export default (apolloConfig: any) => {
  return (PageComponent: any, { ssr = true } = {}) => {
    const WithApollo = ({
      apolloClient,
      apolloState,
      children,
      ...pageProps
    }: {
      apolloClient: any;
      apolloState: any;
      children: any;
    }) => {
      console.log(apolloClient, apolloState);
      const client = useMemo(
        () => apolloClient || initApolloClient(apolloConfig, apolloState),
        []
      );
      return (
        <ApolloProvider client={client}>
          <PageComponent {...pageProps}>{children}</PageComponent>
        </ApolloProvider>
      );
    };

    console.log(fetch); // muss hier stehen, damit fetch geladen wird => ansonsten Fehler!

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
      const displayName =
        PageComponent.displayName || PageComponent.name || 'Component';

      if (displayName === 'App') {
        console.warn('This withApollo HOC only works with PageComponents.');
      }

      WithApollo.displayName = `withApollo(${displayName})`;
    }

    // Allow Next.js to remove getInitialProps from the browser build
    if (typeof window === 'undefined') {
      if (ssr) {
        WithApollo.getInitialProps = async (ctx: NextPageContext) => {
          const { AppTree } = ctx;

          let pageProps = {};
          if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx);
          }

          // Run all GraphQL queries in the component tree
          // and extract the resulting data
          const apolloClient = initApolloClient(apolloConfig, null);

          try {
            // Run all GraphQL queries
            await require('@apollo/react-ssr').getDataFromTree(
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

          // Extract query data from the Apollo store
          const apolloState = apolloClient.cache.extract();

          return {
            ...pageProps,
            apolloState
          };
        };
      }
    }

    return WithApollo;
  };
};
