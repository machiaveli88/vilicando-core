import React from 'react';
import {
  ThemeProvider,
  RendererProvider,
  ThemeProviderProps,
} from 'react-fela';
import { IRenderer } from 'fela';
import defaultRenderer from './defaultRenderer';
import { ITheme } from 'vilicando-core';

export interface IFelaProvider<T = {}>
  extends Omit<ThemeProviderProps, 'theme'> {
  children?: React.ReactNode | Array<React.ReactNode>;
  theme?: Partial<T & ITheme>;
  renderer?: IRenderer;
}

export default function FelaProvider({
  theme = {},
  renderer = defaultRenderer,
  ...props
}: IFelaProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme} {...props} />
    </RendererProvider>
  );
}
