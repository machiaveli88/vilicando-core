import {
  useMutation as _useMutation,
  MutationHookOptions
} from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult,
  MutationResult
} from '@apollo/react-common';
import {
  DocumentNode,
  VariableDefinitionNode,
  DefinitionNode,
  SelectionNode
} from 'graphql';
import { merge, uniqueId } from 'lodash';

export default function useMutation<IData, IVariables = OperationVariables>(
  document: DocumentNode,
  options?: MutationHookOptions<IData, IVariables>
): [
  (
    items: any,
    options?: MutationFunctionOptions<IData, IVariables>
  ) => Promise<ExecutionResult<IData>>,
  MutationResult<IData>
] {
  const [update, result] = _useMutation<IData, IVariables>(document, options);

  // get types & Co
  const _document = JSON.parse(JSON.stringify(document));
  const definition = _document.definitions.find(
    ({ kind }: DefinitionNode) => kind === 'OperationDefinition'
  );
  const { selections } = definition.selectionSet;
  const __name = selections[0].name.value; // z.B. update_user
  const [/* __type, */ __typename] = __name.split('_'); // z.B. [update, user]

  // warn if more than one mutation
  if (
    selections.filter(
      (selection: SelectionNode) =>
        'name' in selection && selection.name.value !== '__typename'
    ).length > 1
  )
    console.warn(
      "hasura.mutate won't work correctly with more than one mutation, please use multiple single mutations or useMutation from @apollo/client instead!"
    );

  return [
    (_items: any, _options?: MutationFunctionOptions<IData, IVariables>) => {
      const items = (Array.isArray(_items) ? _items : [_items]).map(item => ({
        __typename,
        id: uniqueId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...item
      }));

      let { variables, ...options } = _options || {};
      const _variables = {};
      definition.variableDefinitions.forEach(
        ({ variable }: VariableDefinitionNode) =>
          (_variables[variable.name.value] = items[0][variable.name.value])
      );
      variables = merge(_variables, variables);

      return update({
        variables,
        optimisticResponse: (vars: {} | IVariables): IData =>
          (({
            __typename: 'mutation_root',
            [__name]: {
              __typename: `${__typename}_mutation_response`,
              returning: items.map(item => Object.assign(item, vars))
            }
          } as unknown) as IData),

        // todo: need update for inserts!
        /* update: (
          cache,
          {
            data: {
              [__name]: { returning }
            }
          }
        ) => {
          const cacheData = cache.readQuery<IQueryData<IItem>, IQueryVariables>(
            {
              query,
              variables: queryVariables
            }
          );

          const data = {
            ...cacheData,
            [__typename]: [...cacheData[__typename]]
          };

          returning.forEach(item => {
            const index = cacheData[__typename].findIndex(
              ({ id }) => id === item.id
            );

            if (~index)
              if (__type === 'delete') data[__typename].splice(index, 1);
              else
                data[__typename][index] = Object.assign(
                  data[__typename][index],
                  item
                );
            else data[__typename].push(item);
          });

          cache.writeQuery<IQueryData<IItem>, IQueryVariables>({
            query,
            data
          });
        }, */
        ...options
      });
    },
    result
  ];
}
