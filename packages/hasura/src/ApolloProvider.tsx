import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import initApolloClient from './apolloClient';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

interface IApolloProvider {
  children?: React.ReactNode | Array<React.ReactNode>;
  client?: ApolloClient<any>;
  state?: NormalizedCacheObject;
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

export default ({
  children,
  http,
  ws,
  state,
  client = initApolloClient(http, ws, state)
}: IApolloProvider) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
