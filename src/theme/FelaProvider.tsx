import * as React from 'react';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import ThemeProvider from './ThemeProvider';
import createRenderer from './renderer';
import defaultTheme from './theme.json';

const defaultRenderer = createRenderer({});

export interface IFelaProvider {
  children?: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
}

function FelaProvider({
  children,
  theme = {},
  renderer = defaultRenderer
}: IFelaProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={{ ...defaultTheme, ...theme }}>
        {children}
      </ThemeProvider>
    </RendererProvider>
  );
}

export default FelaProvider;
