import React, { useMemo } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { NextPageContext, NextPage } from 'next';
import fetch from 'isomorphic-unfetch';

declare type _ApolloClient = ApolloClient<any> & { createCache: any };

let apolloClient: _ApolloClient = null;
const browser = typeof window !== 'undefined';

// Make sure to create a new client for every server-side request so that data isn't shared between connections (which would be bad)
// Reuse client on the client-side
function initApolloClient<TCacheShape>(
  apolloConfig: _ApolloClient,
  initialState = {}
): ApolloClient<TCacheShape> {
  return !browser || !apolloClient
    ? createApolloClient(apolloConfig, initialState)
    : apolloClient;
}

function createApolloClient<TCacheShape>(
  _apolloConfig: _ApolloClient,
  initialState = {}
): ApolloClient<TCacheShape> {
  const { createCache, ...apolloConfig } = _apolloConfig;
  const _createCache = createCache || (() => new InMemoryCache());

  return new ApolloClient<TCacheShape>({
    connectToDevTools: browser,
    ssrMode: !browser, // Disables forceFetch on the server (so queries are only run once)
    cache: _createCache().restore(initialState || {}),
    ...apolloConfig
  });
}

export interface IWithData {
  apolloClient?: any;
  apolloState?: object;
}

export default function withData<T>(apolloConfig: any) {
  return (PageComponent: NextPage<any>, test = {}) => {
    // @ts-ignore
    const { ssr = true } = test;
    console.log('whats this?', test);

    const WithApollo = ({
      apolloClient,
      apolloState = {},
      ...pageProps
    }: T & IWithData) => {
      console.log(apolloClient, apolloState);

      if (!apolloClient || !fetch) console.log('no config');
      // return <PageComponent {...pageProps}></PageComponent>;

      const client = useMemo(
        () => apolloClient || initApolloClient(apolloConfig, apolloState),
        []
      );
      return (
        <ApolloProvider client={client}>
          <PageComponent {...pageProps}></PageComponent>
        </ApolloProvider>
      );
    };

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
            console.log('dsfdsgfsdgsdf');
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
}
