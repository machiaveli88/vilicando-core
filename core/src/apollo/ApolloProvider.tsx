import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { remove, isEqual } from 'lodash';
import { Loader } from '../components';

enum loaderState {
  LOADER_NO,
  LOADER_STARTED,
  LOADER_ENDED
}

export interface IApolloContext {
  subscribeQuery: (document: DocumentNode) => void;
  unsubscribeQuery: (document: DocumentNode) => void;
}

export interface IApolloProvider<TCacheShape> {
  apollo: ApolloClient<TCacheShape>;
  children: React.ReactNode;
  showLoader?: () => React.ReactNode;
  loading?: boolean;
}

export function handleGlobalLoadingState(
  document: DocumentNode,
  loading: boolean
) {
  const { subscribeQuery, unsubscribeQuery } = useApollo();

  React.useEffect(
    () => (loading ? subscribeQuery(document) : unsubscribeQuery(document)),
    [document, loading]
  );
}

const ApolloContext = React.createContext<IApolloContext>({
  subscribeQuery: () => {},
  unsubscribeQuery: () => {}
});

export function useApollo(): IApolloContext {
  return React.useContext(ApolloContext);
}

function _ApolloProvider<TCacheShape>({
  children,
  apollo,
  showLoader = () => <Loader />,
  loading: defaultLoading = false
}: IApolloProvider<TCacheShape>) {
  const [state, setState] = React.useState<loaderState>(loaderState.LOADER_NO);
  const [loading, setLoading] = React.useState<boolean>(defaultLoading);
  const [, setQueries] = React.useState<Array<DocumentNode>>([]);
  const subscribeQuery = React.useCallback(
    (document: DocumentNode) =>
      setQueries((queries: Array<DocumentNode>) => {
        if (!queries.length && state === loaderState.LOADER_NO) {
          setLoading(true);
          setState(loaderState.LOADER_STARTED);
        }

        return [...queries, document];
      }),
    [state]
  );
  const unsubscribeQuery = React.useCallback(
    (document: DocumentNode) =>
      setQueries(queries => {
        remove(queries, query => isEqual(query, document));

        if (!queries.length && state === loaderState.LOADER_STARTED) {
          setLoading(false);
          setState(loaderState.LOADER_ENDED);
        }

        return queries;
      }),
    [state]
  );

  // todo: Progress-Bar mit Query-Loader verbinden!

  return (
    <ApolloContext.Provider value={{ subscribeQuery, unsubscribeQuery }}>
      {true || loading ? showLoader() : null}
      <ApolloProvider client={apollo}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
}

export default _ApolloProvider;
