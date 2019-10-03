import { useSubscription, SubscriptionHookOptions } from '@apollo/react-hooks';
import { OperationVariables, SubscriptionResult } from '@apollo/react-common';
import { gql } from 'apollo-boost';

export default function _useSubscription<
  TData,
  TVariables = OperationVariables
>(
  query: String,
  options?: SubscriptionHookOptions<TData, TVariables>
): SubscriptionResult {
  const { data, error, ...rest } = useSubscription<TData, TVariables>(
    gql(query),
    options
  );

  if (error) console.warn('gql-subscription-error:', error);

  return { data, error, ...rest };
}
