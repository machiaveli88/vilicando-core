import withData from './withData';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache
  // IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
// import introspectionQueryResultData from './fragmentTypes';

const createCache = () => {
  /* const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  }); */

  return new InMemoryCache(/* { fragmentMatcher } */);
};

// todo: uri und headers variable machen
// todo: fragmentMatcher mit Hilfe von https://graphql-code-generator.com

export default (Component: any) =>
  withData({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
      headers: {
        'x-hasura-admin-secret': 'vilicando_secure'
        // Authorization: `Bearer ${authToken}`
      }
    }),
    createCache
  })(Component);
