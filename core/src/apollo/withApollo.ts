import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';

interface IWithApollo {
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
}

export default ({ http, ws }: IWithApollo) => {
  const ssrMode = typeof window === 'undefined';

  const httpLink = !!http && new HttpLink(http);
  const wsLink = !!ws && !ssrMode && new WebSocketLink(ws);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(err =>
        console.warn(`[GraphQL error]: Message: ${err.message}`)
      );

    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });

  let link = ApolloLink.from([errorLink, httpLink]);

  if (!ssrMode) {
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

  return withApollo(
    ({ initialState = {} }) =>
      new ApolloClient({
        link,
        ssrMode, // todo: enable automatic static optimization https://github.com/zeit/next.js/blob/canary/examples/with-apollo/pages/client-only.js
        cache: new InMemoryCache().restore(initialState)
      }),
    {
      getDataFromTree: 'ssr' // todo: eigentlich sollte im Client loading erst true sein, dann false (Ladeanimation wird gezeigt) und im Server die Daten direkt gezeigt werden => warum auch immer geht das gerade nicht! :(
      // => wenn Splash-Screen hier wieder auf "always" (default) umstellen!
    }
  );
};
