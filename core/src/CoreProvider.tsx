import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import { Loader, Progress } from './components';
import { ThemeProvider } from './theme';
import defaultTheme from './theme/theme.json';
import { defaultRenderer } from './theme';
import { ApolloClient } from 'apollo-boost';

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

export interface ICoreProvider<TCacheShape = any> {
  children: React.ReactNode;
  apollo?: ApolloClient<TCacheShape>;
  theme?: object;
  renderer?: IRenderer;
  showLoader?: () => React.ReactNode;
  loading?: boolean;
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  apollo,
  theme,
  renderer = defaultRenderer,
  showLoader = () => <Loader />,
  loading = false,
  locale = defaultLocale,
  translations = {}
}: ICoreProvider) {
  const content = apollo ? (
    <ApolloProvider client={apollo}>{children}</ApolloProvider>
  ) : (
    children
  );

  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={{ ...defaultTheme, ...theme }}>
        {loading ? showLoader() : null}
        <LanguageProvider translations={translations} locale={locale}>
          <Progress>{content}</Progress>
        </LanguageProvider>
      </ThemeProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
