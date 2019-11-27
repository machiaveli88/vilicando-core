import React from 'react';
import {
  useQuery as _useQuery,
  QueryHookOptions,
  OperationVariables,
  QueryResult
} from '@apollo/client';
import { DocumentNode, DefinitionNode, SelectionNode } from 'graphql';
import { IQueryData, TOptimisticItem } from './typings';

export type IUseQueryDocument = DocumentNode;
export type IUseQueryOptions<IItem, IVariables> = QueryHookOptions<
  IQueryData<IItem>,
  IVariables
>;
export type IUseQueryReturn<IItem, IVariables> = [
  Array<TOptimisticItem<IItem>>,
  QueryResult<IQueryData<IItem>, IVariables>
];

export default function useQuery<IItem, IVariables = OperationVariables>(
  document: IUseQueryDocument,
  options?: IUseQueryOptions<IItem, IVariables>
): IUseQueryReturn<IItem, IVariables> {
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, ...rest } = _useQuery<
    IQueryData<IItem>,
    IVariables
  >(document, options);

  const dataObject = data || {};
  const key = Object.keys(dataObject).filter(x => x !== '__typename')[0];
  const items = (!dataObject[key] || Array.isArray(dataObject[key])
    ? dataObject[key] || []
    : [dataObject[key]]) as Array<TOptimisticItem<IItem>>;
  const result = items.map(item => ({
    __optimistic: false,
    ...item
  }));

  const _document = JSON.parse(JSON.stringify(document));
  const definitionIndex = _document.definitions.findIndex(
    ({ kind }: DefinitionNode) => kind === 'OperationDefinition'
  );
  if (
    _document.definitions[definitionIndex].selectionSet.selections.filter(
      (selection: SelectionNode) =>
        'name' in selection && selection.name.value !== '__typename'
    ).length > 1
  )
    console.warn(
      "hasura.query won't work correctly with more than one query, please use multiple single queries or useQuery from @apollo/client instead!"
    );

  React.useEffect(() => {
    if (skip) return undefined;

    _document.definitions[definitionIndex].operation = 'subscription';
    _document.definitions[
      definitionIndex
    ].name.value = `sub_${_document.definitions[definitionIndex].name.value}`;

    return subscribeToMore<IQueryData<IItem>, IVariables>({
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

  return [result, { data, subscribeToMore, ...rest }];
}
