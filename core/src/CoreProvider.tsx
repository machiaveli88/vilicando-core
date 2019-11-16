import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import { Progress, ResponsiveHelper } from './components';
import { ThemeProvider } from './theme';
import { defaultRenderer } from './theme';
import { ApolloClient } from 'apollo-client';

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
  dev?: boolean;
  apollo?: ApolloClient<TCacheShape>;
  theme?: object;
  renderer?: IRenderer;
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  dev,
  apollo,
  theme,
  renderer = defaultRenderer,
  locale = defaultLocale,
  translations = {}
}: ICoreProvider) {
  const content = apollo ? (
    <ApolloProvider client={apollo}>{children}</ApolloProvider>
  ) : (
    children
  );

  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider value={theme}>
        <LanguageProvider translations={translations} locale={locale}>
          <Progress>
            {!!dev && <ResponsiveHelper />}
            {content}
          </Progress>
        </LanguageProvider>
      </ThemeProvider>
    </RendererProvider>
  );
}

export default CoreProvider;
