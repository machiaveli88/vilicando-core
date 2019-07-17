import * as React from 'react';
import defaultTheme from './theme.json';
import ThemeProvider from './ThemeProvider';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

export interface IFelaProvider {
  children: React.ReactNode;
  renderer: IRenderer;
  theme?: object;
}

function FelaProvider({ children, theme = {}, renderer }: IFelaProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={{ ...defaultTheme, ...theme }}>
        {children}
      </ThemeProvider>
    </RendererProvider>
  );
}

export default FelaProvider;
