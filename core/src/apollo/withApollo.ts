import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache, PresetConfig } from 'apollo-boost';

export default (config: PresetConfig) =>
  withApollo(
    ({ initialState }) =>
      new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        ...config
      }),
    {
      getDataFromTree: 'ssr' // todo: eigentlich sollte im Client loading erst true sein, dann false (Ladeanimation wird gezeigt) und im Server die Daten direkt gezeigt werden => warum auch immer geht das gerade nicht! :(
    }
  );
