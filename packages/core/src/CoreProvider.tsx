import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress, ResponsiveHelper } from './components';
import { FelaProvider, IFela } from './theme';
import ConfigProvider, { IConfig } from './ConfigProvider';

interface ICoreProvider extends IConfig, ILocale, IFela {
  children: React.ReactNode | Array<React.ReactNode>;
  dev?: boolean;
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
