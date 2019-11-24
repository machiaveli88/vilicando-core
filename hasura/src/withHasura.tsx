import * as React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { IPage, IPageContext } from 'vilicando-core';
import { useHasura } from './HasuraProvider';
import { ApolloProvider } from '@apollo/react-hooks';
import { OperationVariables } from '@apollo/react-common';
import fetch from 'isomorphic-unfetch';
import {
  default as query,
  IQueryDocument,
  IQueryOptions,
  IQueryReturn
} from './query';
import {
  default as mutate,
  IMutateDocument,
  IMutateOptions,
  IMutateReturn
} from './mutate';

interface IWithHasuraOptions {
  ssr?: boolean;
}

export interface IWithHasura extends IPage {
  query<IItem, IVariables = OperationVariables>(
    document: IQueryDocument,
    options?: IQueryOptions<IItem, IVariables>
  ): IQueryReturn<IItem, IVariables>;
  mutate<
    IItem extends { id: any },
    IVariables = OperationVariables,
    IQueryVariables = OperationVariables
  >(
    document: IMutateDocument,
    query: IMutateDocument,
    _options?: IMutateOptions<IItem, IVariables, IQueryVariables>
  ): IMutateReturn<IItem, IVariables>;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> {
  const {
    http,
    ws,
    schema: { __schema }
  } = useHasura();

  const httpLink =
    !!http && new HttpLink({ credentials: 'same-origin', fetch, ...http });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(err =>
        console.warn(`[GraphQL error]: Message: ${err.message}`)
      );

    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });
  let link = ApolloLink.from([errorLink, httpLink]);

  const ssrMode = typeof window === 'undefined';
  if (!ssrMode) {
    const wsLink = !!ws && new WebSocketLink(ws);

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

  const resolvers = {};
  __schema.types
    .filter(({ kind }) => kind === 'OBJECT')
    .forEach(({ name }) => {
      resolvers[name] = {
        __optimistic: () => false
      };
    });

  return new ApolloClient({
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState),
    resolvers
  });
}

function initApolloClient(initialState?: NormalizedCacheObject) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') return createApolloClient(initialState);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = createApolloClient(initialState);

  return apolloClient;
}

export default function withHasura(
  PageComponent: any, // todo: remove
  { ssr = false }: IWithHasuraOptions = {}
) {
  const WithHasura = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => (
    <ApolloProvider client={apolloClient || initApolloClient(apolloState)}>
      <PageComponent query={query} mutate={mutate} {...pageProps} />
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
    console.log(PageComponent);
    WithHasura.getInitialProps = async (
      ctx: IPageContext & {
        apolloClient: ApolloClient<any>;
      }
    ) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProps`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

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
}
