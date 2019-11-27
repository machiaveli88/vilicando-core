import * as React from 'react';
import dynamic, { DynamicOptions } from 'next/dynamic';

interface IDynamicOptions<P = {}> extends DynamicOptions<P> {
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

function dynamicWithSSR<P = {}>(
  dynamicOptions: IDynamicOptions<P> | any, // todo: Loader<P> instead of any leads to error: Der Typ "Readonly<{}>" kann dem Typ "never" nicht zugewiesen werden.
  options?: IDynamicOptions<P>
): React.ComponentType<P> {
  if (dynamicOptions instanceof Promise) {
    options.loader = () => dynamicOptions;
    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
  } else if (typeof dynamicOptions === 'function') {
    options.loader = dynamicOptions;
    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
  } else if (typeof dynamicOptions === 'object') {
    options = { ...dynamicOptions };
  }

  const { loading, onSSR, ...rest } = options;
  const isSSR = typeof window === 'undefined';

  return dynamic(
    loading || onSSR
      ? {
          loading: props => (isSSR && onSSR ? onSSR : loading)(props),
          ssr: !onSSR,
          ...rest
        }
      : options
  );
}

export default dynamicWithSSR;
