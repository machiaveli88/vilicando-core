import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import initApolloClient from './apolloClient';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

interface IApolloProvider {
  children?: React.ReactNode | Array<React.ReactNode>;
  state?: NormalizedCacheObject;
  client?: ApolloClient<any>;
}

export default ({
  children,
  state,
  client = initApolloClient(state)
}: IApolloProvider) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
