import React from 'react';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import ConfigProvider from 'antd/lib/config-provider';
import {
  FelaProvider,
  IFelaProvider,
  useLocale,
  theme as defaultTheme
} from 'vilicando-core';
import antdTheme from './theme.json';
import overwrite from './overwrite.json';
import { IAntdTheme } from './types';
import { ITheme } from 'vilicando-core';
import { merge } from 'lodash';
import { RendererProvider } from 'react-fela';
import { colorPalette } from './utils';

function AntdProvider({
  children,
  theme,
  renderer
}: IFelaProvider<IAntdTheme>) {
  const { locale } = useLocale();

  const baseTheme = React.useMemo(
    () =>
      merge<ITheme, IAntdTheme, Partial<IAntdTheme>>(
        antdTheme,
        defaultTheme,
        overwrite
      ),
    []
  );

  const parsedTheme = React.useMemo(() => {
    const newTheme = merge(baseTheme, theme);
    // see also in withAntd!
    newTheme.spacing.xs = theme?.spacing?.xs || newTheme.padding.xs;
    newTheme.spacing.sm = theme?.spacing?.sm || newTheme.padding.sm;
    newTheme.spacing.md = theme?.spacing?.md || newTheme.padding.md;
    newTheme.spacing.lg = theme?.spacing?.lg || newTheme.padding.lg;
    newTheme.font.size.md = theme?.font?.size?.md || newTheme.font.size.base;
    newTheme.primary.base = theme?.primary?.base || newTheme.primary.color;

    const changedColors = {};
    const colors = newTheme.preset.colors.replace(/ /g, '').split(',');
    ['primary', 'secondary', 'grey', ...colors].forEach(color => {
      if (theme?.[color]?.base) {
        let hasChanges = false;
        const schema = { ...newTheme[color], ...theme[color] };
        for (let i = 1; i <= 10; i++)
          if (!theme?.[color]?.[i]) {
            schema[i] = colorPalette(theme[color].base, i);
            newTheme[color][i] = schema[i];
            hasChanges = true;
          }
        if (hasChanges) changedColors[color] = { ...schema };
      }
    });
    if (
      Object.keys(changedColors).length &&
      process.env.NODE_ENV !== 'development'
    )
      console.warn(
        'Automatically color generating is only for development! Please add the following object to your theme.json',
        changedColors
      );

    return newTheme;
  }, [theme, baseTheme]);

  const content = (
    <FelaProvider theme={parsedTheme}>
      <ConfigProvider locale={locale === 'de' ? deDE : enUS}>
        {children}
      </ConfigProvider>
    </FelaProvider>
  );

  return renderer ? (
    <RendererProvider renderer={renderer}>{content}</RendererProvider>
  ) : (
    content
  );
}

export default AntdProvider;
