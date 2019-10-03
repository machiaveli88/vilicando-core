import {
  useLazyQuery,
  LazyQueryHookOptions,
  QueryLazyOptions
} from '@apollo/react-hooks';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { gql } from 'apollo-boost';

export default function _useLazyQuery<TData, TVariables = OperationVariables>(
  query: String,
  options?: LazyQueryHookOptions<TData, TVariables>
): [
  (options?: QueryLazyOptions<TVariables> | undefined) => void,
  QueryResult<TData, TVariables>
] {
  const [getData, { data, error, ...rest }] = useLazyQuery<TData, TVariables>(
    gql(query),
    options
  );

  if (error) console.warn('gql-lazy-query-error:', error);

  return [getData, { data, error, ...rest }];
}
