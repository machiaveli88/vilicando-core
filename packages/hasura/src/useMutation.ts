import {
  useMutation as _useMutation,
  MutationHookOptions,
} from "@apollo/react-hooks";
import {
  OperationVariables,
  MutationFunctionOptions as _MutationFunctionOptions,
  MutationResult,
} from "@apollo/react-common";
import {
  DocumentNode,
  VariableDefinitionNode,
  DefinitionNode,
  SelectionNode,
  ExecutionResult,
} from "graphql";
import { merge, uniqueId } from "lodash";

type TReturning = { __typename?: string; id?: string };
type TData = Partial<
  {
    __typename: "mutation_root";
  } & {
    [x: string]:
      | {
          __typename?: string;
          returning: Array<TReturning>;
        }
      | any; // if any => null | 'mutation_root': Property '__typename' is incompatible with index signature. Type '"mutation_root"' is not assignable to type '{ __typename?: string; returning: { __typename?: string; id?: string; }[]; }'.
  }
>;

interface IUpdateQuery {
  query: DocumentNode;
  variables?: OperationVariables;
}

interface MutationFunctionOptions<IData, IVariables>
  extends _MutationFunctionOptions<IData, IVariables> {
  updateQuery?: IUpdateQuery | Array<IUpdateQuery> | false;
}

export default function useMutation<
  IData extends TData,
  IVariables = OperationVariables
>(
  document: DocumentNode,
  options?: MutationHookOptions<IData, IVariables>
): [
  (
    item: any,
    options?: MutationFunctionOptions<IData, IVariables>
  ) => Promise<ExecutionResult>,
  MutationResult<IData>
] {
  const [update, result] = _useMutation<IData, IVariables>(document, options);

  // get types & Co
  const _document = JSON.parse(JSON.stringify(document));
  const definition = _document.definitions.find(
    ({ kind }: DefinitionNode) => kind === "OperationDefinition"
  );
  const { selections } = definition.selectionSet;
  const __name: string = selections[0].name.value; // z.B. update_user
  const [__typename, __type] = __name.split("_").reverse(); // z.B. [user, update]

  // warn if more than one mutation
  if (
    selections.filter(
      (selection: SelectionNode) =>
        "name" in selection && selection.name.value !== "__typename"
    ).length > 1
  )
    console.warn(
      "hasura.mutate won't work correctly with more than one mutation, please use multiple single mutations or useMutation from @apollo/client instead!"
    );

  return [
    (item: any, _options?: MutationFunctionOptions<IData, IVariables>) => {
      const items = (Array.isArray(item) ? item : [item]).map((x) => {
        // replace "undefined" with "null" to prevent "Missing field active in ..."-warning
        const _x = {};
        Object.keys(x).forEach(
          (key) => (_x[key] = x[key] === undefined ? null : x[key])
        );

        return {
          __typename,
          id: uniqueId(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ..._x,
        };
      });

      let { variables, updateQuery, ...options } = _options || {};
      const _variables = {};
      definition.variableDefinitions.forEach(
        ({ variable }: VariableDefinitionNode) =>
          (_variables[variable.name.value] = items[0][variable.name.value])
      );
      variables = merge({}, _variables, variables);

      return update({
        variables,
        optimisticResponse: (vars: {} | IVariables) =>
          ({
            __typename: "mutation_root",
            [__name]: {
              __typename: `${__typename}_mutation_response`,
              returning: items.map((item) => Object.assign(item, vars)),
            },
          } as IData),
        update: (cache, { data }) => {
          const returning =
            typeof data?.[__name] === "object" ? data?.[__name]?.returning : [];

          if (updateQuery)
            (Array.isArray(updateQuery) ? updateQuery : [updateQuery]).forEach(
              ({ query, variables }) => {
                const cacheData = cache.readQuery({
                  query,
                  variables,
                }) as object;

                const data = {
                  ...cacheData,
                  [__typename]: [...cacheData[__typename]],
                };

                returning.forEach((item: TReturning) => {
                  const index = cacheData[__typename].findIndex(
                    ({ id }: { id: string }) => id === item.id
                  );

                  if (~index)
                    if (__type === "delete") data[__typename].splice(index, 1);
                    else
                      data[__typename][index] = Object.assign(
                        data[__typename][index],
                        item
                      );
                  else data[__typename].push(item);
                });

                cache.writeQuery({
                  query,
                  data,
                });
              }
            );
          else if (__type === "insert" && updateQuery !== false)
            console.warn(
              "updateQuery should be set on insert-mutations, otherwise set updateQuery to false to disable this warning!"
            );
        },
        ...options,
      });
    },
    result,
  ];
}
