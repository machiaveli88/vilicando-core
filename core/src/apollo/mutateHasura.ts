import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult,
  MutationResult
} from '@apollo/react-common';
import { DocumentNode } from 'graphql';

export default function deleteHasura<TData, TVariables = OperationVariables>(
  document: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): [
  (
    variables: TVariables,
    options?: MutationFunctionOptions<TData, TVariables>
  ) => Promise<ExecutionResult<TData>>,
  MutationResult<TData>
] {
  const [update, result] = useMutation<TData, TVariables>(document, options);
  const _document = JSON.parse(JSON.stringify(document));
  if (_document.definitions[0].selectionSet.selections.length > 1)
    console.warn(
      "hasura.delete won't work correctly with more than one mutation, please use useMutation instead!"
    );

  // todo: unbedingt noch refetchQueries und optimisticResponse umsetzen!

  return [
    (
      variables: TVariables,
      options?: MutationFunctionOptions<TData, TVariables>
    ) =>
      update({
        variables,
        ...options
      }),
    result
  ];
}
