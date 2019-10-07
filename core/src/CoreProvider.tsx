import * as React from 'react';
import { ApolloProvider, IApolloProvider } from './apollo';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import { Progress } from './components';
import { ThemeProvider } from './theme';
import defaultTheme from './theme/theme.json';
import { defaultRenderer } from './theme';

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

export interface ICoreProvider<TCacheShape = any>
  extends IApolloProvider<TCacheShape> {
  theme?: object;
  renderer?: IRenderer;
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  apollo,
  theme,
  renderer = defaultRenderer,
  showLoader,
  loading,
  locale = defaultLocale,
  translations = {}
}: ICoreProvider) {
  const content = apollo ? (
    <ApolloProvider apollo={apollo} showLoader={showLoader} loading={loading}>
      {children}
    </ApolloProvider>
  ) : (
    children
  );

  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={{ ...defaultTheme, ...theme }}>
        <LanguageProvider translations={translations} locale={locale}>
          <Progress>{content}</Progress>
        </LanguageProvider>
      </ThemeProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
