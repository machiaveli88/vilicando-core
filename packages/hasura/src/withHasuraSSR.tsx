import React from 'react';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import HasuraProvider from './HasuraProvider';
import getInitialProps from './getInitialProps';

export default async function withHasuraSSR(PageComponent: any) {
  const WithHasuraSSR = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => (
    <HasuraProvider client={apolloClient} state={apolloState}>
      <PageComponent {...pageProps} />
    </HasuraProvider>
  );

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App')
      console.warn('This withHasuraSSR HOC only works with PageComponents.');

    WithHasuraSSR.displayName = `withHasuraSSR(${displayName})`;
  }

  let pageProps = {};
  if (PageComponent.getInitialProps)
    pageProps = await PageComponent.getInitialProps();

  WithHasuraSSR.getInitialProps = getInitialProps(pageProps);

  return WithHasuraSSR;
}
