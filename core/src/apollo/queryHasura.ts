import * as React from 'react';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';

type Test<T> = {
  [K in keyof T[keyof T]]: T[keyof T][K];
};

export default function queryHasura<TData, TVariables = OperationVariables>(
  document: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): [Test<TData>[], QueryResult<TData, TVariables>] {
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, ...rest } = useQuery<TData, TVariables>(
    document,
    options
  );

  const dataObject = data || {};
  const key = Object.keys(dataObject)[0];
  const result = dataObject[key] || [];

  const _document = JSON.parse(JSON.stringify(document));
  if (_document.definitions[0].selectionSet.selections.length > 1)
    console.warn(
      "hasura.query won't work correctly with more than one query, please use useQuery instead!"
    );

  React.useEffect(() => {
    if (skip) return undefined;

    _document.definitions[0].operation = 'subscription';
    _document.definitions[0].name.value = `sub_${_document.definitions[0].name.value}`;

    return subscribeToMore<TData, TVariables>({
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
