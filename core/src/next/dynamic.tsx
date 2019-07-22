import * as React from 'react';
import dynamic, { DynamicOptions, Loader } from 'next/dynamic';

function dynamicWithSSR<P = {}>(
  dynamicOptions: DynamicOptions<P> | Loader<P>,
  options?: DynamicOptions<P> & {
    onSSR?: ({
      error,
      isLoading,
      pastDelay
    }: {
      error?: Error | null;
      isLoading?: boolean;
      pastDelay?: boolean;
      timedOut?: boolean;
    }) => JSX.Element | null;
  }
): React.ComponentType<P> {
  const { loading, onSSR, ...rest } = options;
  const isSSR = typeof window === 'undefined';

  return dynamic(dynamicOptions, {
    loading: props => (isSSR && onSSR ? onSSR : loading)(props),
    ssr: !onSSR,
    ...rest
  });
}

export default dynamicWithSSR;
