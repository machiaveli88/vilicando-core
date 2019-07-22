import * as React from 'react';
import LanguageProvider from './LanguageProvider';
import { Debe } from 'debe';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import { Loader, Progress } from './components';
import { ThemeProvider } from './theme';
import defaultTheme from './theme/theme.json';
// import { DebeProvider } from 'debe-react';

const _navigator = {
  ...(typeof window === 'undefined' ? {} : navigator)
} as any;
const defaultLocale =
  _navigator.languages && _navigator.languages.length
    ? _navigator.languages[0]
    : _navigator.userLanguage ||
      _navigator.language ||
      _navigator.browserLanguage ||
      'de';

export interface ICoreProvider {
  children: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  showLoader?: () => React.ReactNode;
  loading?: boolean;
  db?: Debe | (() => Debe);
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  // db,
  theme,
  renderer,
  showLoader = () => <Loader />,
  loading = false,
  locale = defaultLocale,
  translations = {}
}: ICoreProvider) {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={{ ...defaultTheme, ...theme }}>
        {loading ? showLoader() : null}
        <LanguageProvider translations={translations} locale={locale}>
          <Progress>{children}</Progress>
        </LanguageProvider>
      </ThemeProvider>
    </RendererProvider>
  );
}

/* !!db ? (
<DebeProvider loading={showLoader} value={db}>
  {children}
</DebeProvider>
) : */

export default CoreProvider;
