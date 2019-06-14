import * as React from 'react';
import { Debe } from 'debe';
import { DebeProvider } from 'debe-react';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import LanguageProvider from './LanguageProvider';
import ThemeProvider from './ThemeProvider';
import Loader from './Loader';
import createRenderer from './renderer';
import defaultTheme from './theme';
import './style.less';

const defaultRenderer = createRenderer({});

export interface ICoreProvider {
  children?: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  loader?: () => React.ReactNode;
  db?: Debe | (() => Debe);
}

function CoreProvider({
  children,
  db,
  theme = defaultTheme,
  renderer = defaultRenderer,
  loader = () => <Loader />
}: ICoreProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <LanguageProvider>
        <ThemeProvider value={theme}>
          {!!db && (
            <DebeProvider loading={loader} value={db}>
              {children}
            </DebeProvider>
          )}
        </ThemeProvider>
      </LanguageProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
