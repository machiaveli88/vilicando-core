import React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { NextPageContext } from 'next';
import initApolloClient from './apolloClient';

export default (pageProps: object) => async ({
  AppTree,
  apolloClient,
  res
}: NextPageContext & {
  apolloClient: ApolloClient<any>;
}) => {
  // Initialize ApolloClient, add it to the ctx object so
  // we can use it in `PageComponent.getInitialProps`.
  apolloClient = initApolloClient();

  // Only on the server:
  if (typeof window === 'undefined')
    if (res && res.finished)
      // When redirecting, the response is finished.
      // No point in continuing to render
      return pageProps;
    // Only if ssr is enabled
    else {
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

  // Extract query data from the Apollo store
  const apolloState = apolloClient.cache.extract();

  return {
    ...pageProps,
    apolloState
  };
};
