import * as React from 'react';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import { Loader, Progress } from './components';
import { ThemeProvider } from './theme';
import defaultTheme from './theme/theme.json';
import DebeProvider, { IDebeProvider } from './DebeProvider';

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

export interface ICoreProvider extends IDebeProvider {
  children: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  loading?: boolean;
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  db,
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
        <DebeProvider showLoader={showLoader} db={db}>
          <LanguageProvider translations={translations} locale={locale}>
            <Progress>{children}</Progress>
          </LanguageProvider>
        </DebeProvider>
      </ThemeProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
