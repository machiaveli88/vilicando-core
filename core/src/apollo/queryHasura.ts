import * as React from 'react';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { handleGlobalLoadingState } from './ApolloProvider';

export default function queryHasura<TData, TVariables = OperationVariables>(
  document: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): [TData[keyof TData], QueryResult<TData, TVariables>] {
  const { skip, variables, onError } = options || {};
  const { data, subscribeToMore, loading, ...rest } = useQuery<
    TData,
    TVariables
  >(document, options);

  const dataObject = data || {};
  const key = Object.keys(dataObject)[0];
  const result = (dataObject[key] || []).map(
    ({ __typename, ...rest }: TData & { __typename: string }) => rest
  );

  const _document = JSON.parse(JSON.stringify(document));
  if (_document.definitions[0].selectionSet.selections.length > 1)
    console.warn(
      "hasura.query won't work correctly with more than one query, please use useQuery instead!"
    );

  handleGlobalLoadingState(document, loading);

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

  return [result, { data, subscribeToMore, loading, ...rest }];
}
