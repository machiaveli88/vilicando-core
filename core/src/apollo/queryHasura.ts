import * as React from 'react';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { DocumentNode, DefinitionNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { IQueryData, TOptimisticItem } from './typings';

export default function queryHasura<IItem, IVariables = OperationVariables>(
  document: DocumentNode,
  options?: QueryHookOptions<IQueryData<IItem>, IVariables>
): [Array<TOptimisticItem<IItem>>, QueryResult<IQueryData<IItem>, IVariables>] {
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, ...rest } = useQuery<
    IQueryData<IItem>,
    IVariables
  >(document, options);

  const dataObject = data || {};
  const key = Object.keys(dataObject)[0];
  const result = (dataObject[key] || []).map(item => ({
    __optimistic: false, // todo: __optimistic von optimisticResponse kommt nicht durch... hier sind alle items OHNE __optimistic :(
    ...item
  }));

  const _document = JSON.parse(JSON.stringify(document));
  const definitionIndex = _document.definitions.findIndex(
    ({ kind }: DefinitionNode) => kind === 'OperationDefinition'
  );
  if (_document.definitions[definitionIndex].selectionSet.selections.length > 1)
    console.warn(
      "hasura.query won't work correctly with more than one query, please use useQuery instead!"
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
  }, [skip]);

  return [result, { data, subscribeToMore, ...rest }];
}
