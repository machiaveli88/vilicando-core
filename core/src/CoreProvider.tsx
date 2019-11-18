import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { Progress, ResponsiveHelper } from './components';
import { FelaProvider } from './theme';
import { ApolloClient } from 'apollo-client';

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
  renderer,
  locale,
  translations = {}
}: ICoreProvider) {
  const content = apollo ? (
    <ApolloProvider client={apollo}>{children}</ApolloProvider>
  ) : (
    children
  );

  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return (
    <FelaProvider renderer={renderer} theme={theme}>
      <LanguageProvider translations={translations} locale={locale}>
        <Progress>
          {!!dev && <ResponsiveHelper />}
          {content}
        </Progress>
      </LanguageProvider>
    </FelaProvider>
  );
}

export default CoreProvider;
