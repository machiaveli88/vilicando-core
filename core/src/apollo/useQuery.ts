import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { gql } from 'apollo-boost';

export default function _useQuery<TData, TVariables = OperationVariables>(
  query: String,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult {
  const { data, error, ...rest } = useQuery<TData, TVariables>(
    gql(query),
    options
  );

  if (error) console.warn('gql-query-error:', error);

  return { data, error, ...rest };
}
