import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import ConfigProvider, { IConfig } from './ConfigProvider';

interface ICoreProvider extends IConfig, ILocale, IFela {
  children: React.ReactNode | Array<React.ReactNode>;
}

function CoreProvider({
  children,
  title,
  theme,
  renderer,
  locale
}: ICoreProvider) {
  return (
    <ConfigProvider title={title}>
      <FelaProvider renderer={renderer} theme={theme}>
        <LocaleProvider locale={locale}>
          <Progress>{children}</Progress>
        </LocaleProvider>
      </FelaProvider>
    </ConfigProvider>
  );
}

export default CoreProvider;
