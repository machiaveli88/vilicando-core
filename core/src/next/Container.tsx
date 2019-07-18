import * as React from 'react';
import CoreProvider, { ICoreProvider } from '../CoreProvider';
import { Container as NextContainer } from 'next/app';
import { IRenderer } from 'fela';

function Container(props: ICoreProvider) {
  return (
    <NextContainer>
      <CoreProvider {...props} />
    </NextContainer>
  );
}

export default Container;
