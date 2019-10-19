import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult,
  MutationResult
} from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import uuid from 'uuid/v4';
import { TQueryData } from './queryHasura';

type TData<TItem> = {
  [x: string]: { __typename: string; returning: Array<TItem> };
};

export default function mutateHasura<
  TItem extends { id: any },
  TVariables = OperationVariables
>(
  document: DocumentNode,
  query: DocumentNode,
  options?: MutationHookOptions<TData<TItem>, TVariables>
): [
  (
    item: TItem,
    options?: MutationFunctionOptions<TData<TItem>, TVariables>
  ) => Promise<ExecutionResult<TData<TItem>>>,
  MutationResult<TData<TItem>>
] {
  const [update, result] = useMutation<TData<TItem>, TVariables>(
    document,
    options
  );
  const _document = JSON.parse(JSON.stringify(document));
  const definition = _document.definitions.find(
    ({ kind }: { kind: string }) => kind === 'OperationDefinition'
  );
  const { selections } = definition.selectionSet;
  const __name = selections[0].name.value; // update_user
  const __type = __name.split('_')[1]; // user
  const __typename = __type + '_mutation_response'; // user_mutation_response

  if (selections.length > 1)
    console.warn(
      "hasura.delete won't work correctly with more than one mutation, please use useMutation instead!"
    );

  return [
    (
      _item: TItem,
      options?: MutationFunctionOptions<TData<TItem>, TVariables>
    ) => {
      const item = {
        __typename,
        id: uuid(),
        ..._item
      };

      const variables = {};
      definition.variableDefinitions.forEach(
        ({ variable }: { variable: { name: { value: string } } }) => {
          const key = variable.name.value;

          variables[key] = item[key];
        }
      );

      return update({
        variables: variables as TVariables,
        optimisticResponse: (vars: {} | TVariables) => ({
          [__name]: {
            __typename,
            returning: [{ ...item, ...vars, __optimistic: true }]
          }
        }),
        update: (
          cache,
          {
            data: {
              [__name]: { returning }
            }
          }
        ) => {
          const cacheData = cache.readQuery<TQueryData<TItem>>({
            query
            // variables todo: Möglichkeit der query noch variablen mitgeben zu können
          });
          const data = {
            ...cacheData,
            [__type]: [
              ...cacheData[__type].filter(({ id }) => id !== item.id),
              ...returning.map(item => ({ __optimistic: false, ...item }))
            ]
          };

          cache.writeQuery({
            query,
            data
          });
        },
        ...options
      });
    },
    result
  ];
}
