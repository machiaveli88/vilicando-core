import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import ConfigProvider, { IConfig } from './ConfigProvider';
import PWAProvider from './PWAProvider';

interface ICoreProvider extends IConfig, ILocale, IFela {
  children: React.ReactNode | Array<React.ReactNode>;
  isPWA?: boolean;
}

function AppProvider({
  children,
  title,
  theme,
  renderer,
  locale,
  isPWA
}: ICoreProvider) {
  return (
    <ConfigProvider title={title}>
      <FelaProvider renderer={renderer} theme={theme}>
        <LocaleProvider locale={locale}>
          <Progress>
            {isPWA ? <PWAProvider>{children}</PWAProvider> : children}
          </Progress>
        </LocaleProvider>
      </FelaProvider>
    </ConfigProvider>
  );
}

export default AppProvider;
