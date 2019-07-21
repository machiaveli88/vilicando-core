import * as React from 'react';
import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import NoSSR from 'react-no-ssr';

function dynamicWithSSR<P = {}>(
  dynamicOptions: DynamicOptions<P> | Loader<P>,
  options?: DynamicOptions<P> & { onSSR?: React.ReactChild }
): React.ComponentType<P> {
  const { loading, onSSR, ...rest } = options;

  if (loading && onSSR)
    return dynamic(dynamicOptions, {
      loading: props => <NoSSR onSSR={onSSR}>{loading(props)}</NoSSR>,
      ssr: false,
      ...rest
    });

  return dynamic(dynamicOptions, options);
}

export default dynamicWithSSR;
