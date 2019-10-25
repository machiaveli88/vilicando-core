import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult,
  MutationResult
} from '@apollo/react-common';
import { DocumentNode, VariableDefinitionNode, DefinitionNode } from 'graphql';
import uuid from 'uuid/v4';
import { TQueryData, TMutationData } from './types';

export default function mutateHasura<
  TItem extends { id?: any },
  TVariables = OperationVariables,
  TQueryVariables = OperationVariables
>(
  document: DocumentNode,
  query: DocumentNode,
  _options?: MutationHookOptions<TMutationData<TItem>, TVariables> & {
    queryVariables?: TQueryVariables;
  }
): [
  (
    item: TVariables & Partial<TItem>,
    options?: MutationFunctionOptions<TMutationData<TItem>, TVariables>
  ) => Promise<ExecutionResult<TMutationData<TItem>>>,
  MutationResult<TMutationData<TItem>>
] {
  const { queryVariables, ...options } = _options || {};
  const [update, result] = useMutation<TMutationData<TItem>, TVariables>(
    document,
    options
  );
  const _document = JSON.parse(JSON.stringify(document));
  const definition = _document.definitions.find(
    ({ kind }: DefinitionNode) => kind === 'OperationDefinition'
  );
  const { selections } = definition.selectionSet;
  const __name = selections[0].name.value; // z.B. update_user
  const __type = __name.split('_')[1]; // z.B. user
  const __typename = __type + '_mutation_response'; // z.B. user_mutation_response

  if (selections.length > 1)
    console.warn(
      "hasura.mutate won't work correctly with more than one mutation, please use useMutation instead!"
    );

  // update: Ganzes Item kein Problem
  // delete: Ganzes Item kein Problem
  // insert: Nur Vars --- das Problem ist, dass id, created-at und updated-at erst mit dem Anlegen erzeugt werden, aber derzeit required sind (zumindest die id) => id müsste unrequired sein und wird ja dann hier erzeugt, falls nicht vorhanden!
  // updateAll: Ganze Items kein Problem --- das Problem bei xyAll ist, dass man aus dem übergebenen Item keine optimisticResponse erzeugen kann (update würde gehen indem man die Items aus dem Cache holt und nicht die ganzen Einträge austauscht sondern nur die betroffenen Felder).
  //                      => man könnte überlegen ob man in dem Fall dann nicht ein Item sondern ein Item-Array übergibt, dann könnte es klappen!

  return [
    (
      _item: TVariables & Partial<TItem>,
      _options?: MutationFunctionOptions<TMutationData<TItem>, TVariables>
    ) => {
      const item = {
        __typename,
        id: uuid(),
        ..._item
      };

      let { variables, ...options } = _options || {};
      if (!variables) {
        let warn = false;
        const _variables = {};
        definition.variableDefinitions.forEach(
          ({ variable, type }: VariableDefinitionNode) => {
            const key = variable.name.value;
            const _type = 'name' in type && type.name.value;

            // todo: werden diese Abfragen noch benötigt, wenn _item: TVariables & Partial<TItem> ???
            //      dadurch wird ja automatisch garantiert, dass sich die vars und das item mappt
            //      => dann sollte auch "if (!variables) {" überflüssig werden, da die vars immer automatisch gemappt werden sollten
            if (
              !(
                item[key] !== 'undefined' && // checken ob alle vars !== undefined sind
                (type.kind !== 'NonNullType' || !!item[key]) && // checken ob alle non-nullable vars !== null sind
                (!_type || // checken ob alle bei allen vars die typen stimmen
                  (_type === 'String' && typeof item[key] === 'string') ||
                  (_type === 'Int' && typeof item[key] === 'number') ||
                  (_type === 'Float' && typeof item[key] === 'number') ||
                  (_type === 'Boolean' && typeof item[key] === 'boolean'))
              )
            )
              warn = warn || true;

            _variables[key] = item[key];
          }
        );

        if (!warn) variables = _variables as TVariables;
        else
          console.warn(
            'Variables cannot be created automatically from item! Please set manually!'
          );
      }

      return update({
        variables,
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
          const cacheData = cache.readQuery<TQueryData<TItem>, TQueryVariables>(
            {
              query,
              variables: queryVariables
            }
          );

          const data = {
            ...cacheData,
            [__type]: [...cacheData[__type]]
          };

          returning.forEach(item => {
            const index = cacheData[__type].findIndex(
              ({ id }) => id === item.id
            );

            if (~index) data[__type][index] = item;
            else data[__type].push(item);
          });
          data[__type] = data[__type].map((item: TQueryData<TItem>) => ({
            __optimistic: false,
            ...item
          }));

          cache.writeQuery<TQueryData<TItem>, TQueryVariables>({
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
