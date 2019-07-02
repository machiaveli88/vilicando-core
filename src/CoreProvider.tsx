import * as React from 'react';
import { Debe } from 'debe';
import { DebeProvider } from 'debe-react';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import LanguageProvider from './LanguageProvider';
import { Loader } from './components';
import { ThemeProvider, theme as defaultTheme, createRenderer } from './theme';
// import '../assets/style.less';

const defaultRenderer = createRenderer({});

export interface ICoreProvider {
  children?: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  loader?: () => React.ReactNode;
  db?: Debe | (() => Debe);
  phrases?: object;
  locale?: string;
}

function CoreProvider({
  children,
  db,
  theme = defaultTheme,
  renderer = defaultRenderer,
  loader = () => <Loader />,
  phrases,
  locale
}: ICoreProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <LanguageProvider phrases={phrases} locale={locale}>
        <ThemeProvider value={theme}>
          {!!db ? (
            <DebeProvider loading={loader} value={db}>
              {children}
            </DebeProvider>
          ) : (
            children
          )}
        </ThemeProvider>
      </LanguageProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
