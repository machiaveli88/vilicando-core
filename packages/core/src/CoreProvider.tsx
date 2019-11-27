import React from 'react';
import LanguageProvider from './LanguageProvider';
import { IRenderer } from 'fela';
import { Progress, ResponsiveHelper } from './components';
import { FelaProvider } from './theme';

export interface ICoreProvider<TCacheShape = any> {
  children: React.ReactNode;
  dev?: boolean;
  theme?: object;
  renderer?: IRenderer;
  locale?: string;
  translations?: object;
}

function CoreProvider({
  children,
  dev,
  theme,
  renderer,
  locale,
  translations = {}
}: ICoreProvider) {
  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return (
    <FelaProvider renderer={renderer} theme={theme}>
      <LanguageProvider translations={translations} locale={locale}>
        <Progress>
          {!!dev && <ResponsiveHelper />}
          {children}
        </Progress>
      </LanguageProvider>
    </FelaProvider>
  );
}

export default CoreProvider;
