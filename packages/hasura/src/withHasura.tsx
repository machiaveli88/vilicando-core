import React from 'react';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloProvider from './ApolloProvider';
import getInitialProps from './getInitialProps';

interface IWithHasuraProps {
  ssr?: boolean;
}

export default function withHasura(
  PageComponent: any,
  { ssr = true }: IWithHasuraProps = {}
) {
  const WithHasura = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => (
    <ApolloProvider client={apolloClient} state={apolloState}>
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
    WithHasura.getInitialProps = getInitialProps(ssr);

  return WithHasura;
}
