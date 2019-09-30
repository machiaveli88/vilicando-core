import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult
} from '@apollo/react-common';
import { gql, ApolloError } from 'apollo-boost';

export default function _useMutation<TData, TVariables = OperationVariables>(
  mutation: String,
  options?: MutationHookOptions<TData, TVariables>
): [
  (
    variables: TVariables,
    options?: MutationFunctionOptions<TData, TVariables>
  ) => Promise<ExecutionResult<TData>>,
  TData,
  ApolloError
] {
  const [update, { error, data = {} as TData }] = useMutation<
    TData,
    TVariables
  >(gql(mutation), options);

  if (error) console.warn('gql-mutation-error:', error);

  return [
    (
      variables: TVariables,
      options?: MutationFunctionOptions<TData, TVariables>
    ) => update({ variables, ...options }),
    data,
    error
  ];
}
