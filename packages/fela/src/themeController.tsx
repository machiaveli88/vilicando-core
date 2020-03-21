import React from 'react';
import {
  themeController as baseThemeController,
  IThemeController,
  IThemeProvider,
  TThemeIn,
  TThemeOut
} from 'vilicando-core';
import FelaProvider from './FelaProvider';
import useFelaBase, { IUseFela } from './useFela';

interface IFelaThemeController<T, P> extends IThemeController<T> {
  useFela: (props?: P) => IUseFela<TThemeOut<T>, P>;
}

export default function themeController<T, P = {}>(
  nameOrVars?: string | TThemeIn<T>,
  vars?: TThemeIn<T>
): IFelaThemeController<T, P> {
  const {
    defaultTheme,
    ThemeProvider: BaseThemeProvider,
    useTheme,
    ...controller
  } = baseThemeController<T>(nameOrVars, vars);

  function ThemeProvider({
    children,
    theme: _theme,
    setTheme: _setTheme
  }: IThemeProvider) {
    const [theme, setTheme] = React.useState<string>(_theme || defaultTheme);
    const themeVars = useTheme(_theme || theme);

    return (
      <BaseThemeProvider
        theme={_theme || theme}
        setTheme={_setTheme || setTheme}
      >
        <FelaProvider theme={themeVars}>{children}</FelaProvider>
      </BaseThemeProvider>
    );
  }

  function useFela(props?: P): IUseFela<TThemeOut<T>, P> {
    return useFelaBase<TThemeOut<T>, P>(props);
  }

  return { useFela, useTheme, ThemeProvider, defaultTheme, ...controller };
}
