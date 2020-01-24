import React from 'react';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import ApolloProvider from './ApolloProvider';
import getInitialProps from './getInitialProps';

interface IWithHasuraProps {
  ssr?: boolean;
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

export default function withHasura(
  PageComponent: any,
  { ssr = true, ...props }: IWithHasuraProps = {}
) {
  const WithHasura = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => (
    <ApolloProvider client={apolloClient} state={apolloState} {...props}>
      <PageComponent {...pageProps} />
    </ApolloProvider>
  );

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App')
      console.warn('This withHasura HOC only works with PageComponents.');

    WithHasura.displayName = `withHasura(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps)
    WithHasura.getInitialProps = getInitialProps({ ssr, ...props });

  return WithHasura;
}
