import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache, PresetConfig } from 'apollo-boost';

export default (config: PresetConfig) =>
  withApollo(
    ({ initialState }) =>
      new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        ...config
      })
  );
