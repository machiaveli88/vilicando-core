import React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import ConfigProvider from 'antd/lib/config-provider';
import { parseTheme } from './utils';
import {
  FelaProvider,
  useLanguage,
  theme as defaultTheme
} from 'vilicando-core';
import antdTheme from './theme.json';
import { IAntdTheme } from './types';
import { ITheme as IDefaultTheme } from 'vilicando-core';
import { merge } from 'lodash';

export type ITheme = IDefaultTheme & IAntdTheme;

export interface IAntdProvider<T = {}> {
  children: React.ReactNode;
  theme?: Partial<ITheme> & T;
}

function AntdProvider<T>({ children, theme }: IAntdProvider<T>) {
  const { locale } = useLanguage();

  // replacing @-vars & functions with values
  const parsedTheme = React.useMemo(() => {
    const parsedTheme = parseTheme<T>({
      ...antdTheme,
      ...theme
    });

    const newTheme = merge<IDefaultTheme, IAntdTheme & T>(
      defaultTheme,
      parsedTheme
    );

    newTheme.spacing.xs = newTheme.padding.xs;
    newTheme.spacing.sm = newTheme.padding.sm;
    newTheme.spacing.md = newTheme.padding.md;
    newTheme.spacing.lg = newTheme.padding.lg;

    newTheme.font.size.md = newTheme.font.size.base;
    newTheme.heading[5].size = `calc(${newTheme.font.size.base} * 1.312)`;
    newTheme.heading[6].size = `calc(${newTheme.font.size.base} * 1.125)`;

    newTheme.primary.base = newTheme.primary.color;

    return newTheme;
  }, [theme]);

  return (
    <FelaProvider theme={parsedTheme}>
      <ConfigProvider locale={locale === 'de' ? deDE : enUS}>
        {children}
      </ConfigProvider>
    </FelaProvider>
  );
}

export default AntdProvider;
