import React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { NextPageContext } from 'next';
import { WebSocketLink } from 'apollo-link-ws';
import initApolloClient from './apolloClient';

interface IWithHasuraProps {
  // todo: doppelt
  ssr?: boolean;
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

export default ({ http, ws, ssr }: IWithHasuraProps) => async ({
  AppTree,
  apolloClient,
  res
}: // ...rest
NextPageContext & {
  apolloClient: ApolloClient<any>;
}) => {
  // Initialize ApolloClient, add it to the ctx object so
  // we can use it in `PageComponent.getInitialProps`.
  apolloClient = initApolloClient(http, ws);

  // Run wrapped getInitialProps methods
  let pageProps = {};
  /* if (PageComponent.getInitialProps)
    pageProps = await PageComponent.getInitialProps({
      AppTree,
      res,
      ...rest
    }); */

  // Only on the server:
  if (typeof window === 'undefined')
    if (res && res.finished)
      // When redirecting, the response is finished.
      // No point in continuing to render
      return pageProps;
    // Only if ssr is enabled
    else if (ssr) {
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
