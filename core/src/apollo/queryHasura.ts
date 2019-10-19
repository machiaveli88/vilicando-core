import * as React from 'react';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';

type TOptimisticItem<TItem> = TItem & {
  __optimistic?: boolean;
  id: any;
};

export type TQueryData<TItem> = {
  [x: string]: Array<TOptimisticItem<TItem>>;
};

export default function queryHasura<TItem, TVariables = OperationVariables>(
  document: DocumentNode,
  options?: QueryHookOptions<TQueryData<TItem>, TVariables>
): [Array<TOptimisticItem<TItem>>, QueryResult<TQueryData<TItem>, TVariables>] {
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, ...rest } = useQuery<
    TQueryData<TItem>,
    TVariables
  >(document, options);

  const dataObject = data || {};
  const key = Object.keys(dataObject)[0];
  const result = (dataObject[key] || []).map(item => ({
    __optimistic: false,
    ...item
  }));

  const _document = JSON.parse(JSON.stringify(document));
  const definitionIndex = _document.definitions.findIndex(
    ({ kind }: { kind: string }) => kind === 'OperationDefinition'
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

    return subscribeToMore<TQueryData<TItem>, TVariables>({
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
