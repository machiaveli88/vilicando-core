import React from 'react';
import LocaleProvider, { TLocale } from './LocaleProvider';
import { IRenderer } from 'fela';
import { Progress, ResponsiveHelper } from './components';
import { FelaProvider } from './theme';
import ConfigProvider from './ConfigProvider';

interface ICoreProvider {
  children: React.ReactNode;
  dev?: boolean;
  title?: string;
  theme?: object;
  renderer?: IRenderer;
  locale?: TLocale;
}

function CoreProvider({
  children,
  dev,
  title,
  theme,
  renderer,
  locale
}: ICoreProvider) {
  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return (
    <ConfigProvider title={title}>
      <FelaProvider renderer={renderer} theme={theme}>
        <LocaleProvider locale={locale}>
          <Progress>
            {!!dev && <ResponsiveHelper />}
            {children}
          </Progress>
        </LocaleProvider>
      </FelaProvider>
    </ConfigProvider>
  );
}

export default CoreProvider;
