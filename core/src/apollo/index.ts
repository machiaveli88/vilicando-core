export {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription
} from '@apollo/react-hooks';
export { default as ApolloProvider, IApolloProvider } from './ApolloProvider';
export { default as withApollo } from './withApollo';

import { default as query } from './queryHasura';
import { default as mutate } from './mutateHasura';
export const hasura = { query, mutate };
