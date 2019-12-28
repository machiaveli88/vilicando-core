import React from 'react';
import LocaleProvider, { ILocales } from './language';
import { IRenderer } from 'fela';
import { Progress, ResponsiveHelper } from './components';
import { FelaProvider } from './theme';

export interface ICoreProvider {
  children: React.ReactNode;
  dev?: boolean;
  theme?: object;
  renderer?: IRenderer;
  locale?: ILocales;
}

function CoreProvider({
  children,
  dev,
  theme,
  renderer,
  locale
}: ICoreProvider) {
  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return (
    <FelaProvider renderer={renderer} theme={theme}>
      <LocaleProvider locale={locale}>
        <Progress>
          {!!dev && <ResponsiveHelper />}
          {children}
        </Progress>
      </LocaleProvider>
    </FelaProvider>
  );
}

export default CoreProvider;
