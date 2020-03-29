import React from "react";
import { useQuery as _useQuery, QueryHookOptions } from "@apollo/react-hooks";
import { DocumentNode, DefinitionNode, SelectionNode } from "graphql";
import { OperationVariables, QueryResult } from "@apollo/react-common";

export default function useQuery<
  IData,
  IVariables = OperationVariables,
  TReturn = Array<any>
>(
  document: DocumentNode,
  options?: QueryHookOptions<IData, IVariables>
): [TReturn, QueryResult<IData, IVariables>] {
  // todo: replace Array<any> with IData[return]
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, ...rest } = _useQuery<IData, IVariables>(
    document,
    options
  );

  const _document = JSON.parse(JSON.stringify(document));
  const definitionIndex = _document.definitions.findIndex(
    ({ kind }: DefinitionNode) => kind === "OperationDefinition"
  );
  if (
    _document.definitions[definitionIndex].selectionSet.selections.filter(
      (selection: SelectionNode) =>
        "name" in selection && selection.name.value !== "__typename"
    ).length > 1
  )
    console.warn(
      "hasura.query won't work correctly with more than one query, please use multiple single queries or useQuery from @apollo/client instead!"
    );

  React.useEffect(() => {
    if (skip) return undefined;

    _document.definitions[definitionIndex].operation = "subscription";
    _document.definitions[
      definitionIndex
    ].name.value = `sub_${_document.definitions[definitionIndex].name.value}`;

    return subscribeToMore<IData, IVariables>({
      document: _document,
      variables,
      onError: ({ name, message, stack }: Error) =>
        onError
          ? onError({
              name,
              message,
              stack,
              networkError: null,
              extraInfo: null,
              graphQLErrors: null
            })
          : {},
      updateQuery: (previousQueryResult, { subscriptionData }) =>
        subscriptionData.data || previousQueryResult
    });
  }, [_document, definitionIndex, onError, skip, subscribeToMore, variables]);

  // extract items from returned data
  const dataObject = data || {};
  const key = Object.keys(dataObject).filter(x => x !== "__typename")[0];
  const items =
    !dataObject[key] || Array.isArray(dataObject[key])
      ? dataObject[key] || []
      : [dataObject[key]];

  return [items, { data, subscribeToMore, ...rest }];
}
