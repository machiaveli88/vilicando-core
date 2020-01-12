import React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import ConfigProvider from 'antd/lib/config-provider';
import { FelaProvider, useLocale, theme as defaultTheme } from 'vilicando-core';
import antdTheme from './theme.json';
import overwrite from './overwrite.json';
import { IAntdTheme } from './types';
import { ITheme as IDefaultTheme } from 'vilicando-core';
import { merge } from 'lodash';
import { colorPalette } from './utils';

type ITheme<T = {}> = IDefaultTheme & IAntdTheme & T;

export interface IAntdProvider<T = {}> {
  children: React.ReactNode | Array<React.ReactNode>;
  theme?: ITheme<T>;
}

function AntdProvider<T>({ children, theme }: IAntdProvider<T>) {
  const { locale } = useLocale();

  const baseTheme = React.useMemo(
    () =>
      merge<IDefaultTheme, IAntdTheme, Partial<IAntdTheme>>(
        defaultTheme,
        antdTheme,
        overwrite
      ),
    []
  );

  const parsedTheme = React.useMemo(() => {
    const newTheme = merge<ITheme, ITheme<T>>(baseTheme, theme);
    // see also in withAntd!
    newTheme.spacing.xs = theme?.spacing?.xs || newTheme.padding.xs;
    newTheme.spacing.sm = theme?.spacing?.sm || newTheme.padding.sm;
    newTheme.spacing.md = theme?.spacing?.md || newTheme.padding.md;
    newTheme.spacing.lg = theme?.spacing?.lg || newTheme.padding.lg;
    newTheme.font.size.md = theme?.font?.size?.md || newTheme.font.size.base;
    newTheme.heading[5].size =
      theme?.heading?.[5]?.size || `calc(${newTheme.font.size.base} * 1.312)`;
    newTheme.heading[6].size =
      theme?.heading?.[6]?.size || `calc(${newTheme.font.size.base} * 1.125)`;
    newTheme.primary.base = theme?.primary?.base || newTheme.primary.color;

    const changedColors = {};
    const colors = newTheme.preset.colors.replace(/ /g, '').split(',');
    ['primary', 'secondary', 'grey', ...colors].forEach(color => {
      if (theme?.[color]?.base) {
        const schema = { ...newTheme[color], ...theme[color] };
        for (let i = 1; i <= 10; i++)
          if (!theme?.[color]?.[i]) {
            schema[i] = colorPalette(theme[color].base, i);
            newTheme[color][i] = schema[i];
          }
        changedColors[color] = { ...schema };
      }
    });
    if (process.env.NODE_ENV !== 'development')
      console.warn(
        'Automatically color generating is only for development! Please add the following object to your theme.json',
        changedColors
      );

    return newTheme;
  }, [theme, baseTheme]);

  return (
    <FelaProvider theme={parsedTheme}>
      <ConfigProvider locale={locale === 'de' ? deDE : enUS}>
        {children}
      </ConfigProvider>
    </FelaProvider>
  );
}

export default AntdProvider;
