import React from 'react';
import { ITheme as IDefaultTheme } from './types';
import baseTheme from './theme.json';
import { merge } from 'lodash';
import Head from 'next/head';

type TThemeIn<T, OptT = {}> = Partial<IDefaultTheme & T & OptT>;
type TThemeOut<T> = Partial<IDefaultTheme & T>;
type TThemeContext = [string, React.Dispatch<React.SetStateAction<string>>];

interface IThemeProvider {
  children: React.ReactNode | Array<React.ReactNode>;
  theme?: string;
}

const defaultSetTheme = () => console.warn('ThemeProvider not found!');

export default function theme<T>(
  nameOrVars?: string | TThemeIn<T>,
  vars?: TThemeIn<T>
) {
  let defaultTheme = 'default';
  let defaultThemeVars = vars;
  if (typeof nameOrVars === 'string') defaultTheme = nameOrVars as string;
  else defaultThemeVars = nameOrVars;

  const defaultContext: TThemeContext = [defaultTheme, defaultSetTheme];
  const ThemeContext = React.createContext<TThemeContext>(defaultContext);

  const themes: { [k: string]: TThemeIn<T> } = {};
  themes[defaultTheme] = merge({}, baseTheme, defaultThemeVars);

  const useThemeContext = (): TThemeContext => React.useContext(ThemeContext);

  const useTheme = (name?: string): TThemeOut<T> => {
    const [theme] = useThemeContext();

    return themes[name] || themes[theme] || themes[defaultTheme];
  };

  function ThemeProvider({ children, theme = defaultTheme }: IThemeProvider) {
    const state = React.useState<string>(theme);
    const _theme = useTheme();

    return (
      <>
        <Head>
          <style>
            {`
          html,
          body {
            width: 100%;
            height: 100%;
            font-family: ${_theme.font.family};
            font-size: ${_theme.font.size.md};
            color: ${_theme.black};
          }
          body {
            background-color: ${_theme.app.background};
          }
          #__next {
            width: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            background-color: ${_theme.app.foreground};
            background-color: 'red';
          }
          #__next > * {
            flex-grow: 1;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: ${_theme.heading.color};
          }
          h1 {
            font-size: ${_theme.heading[1].size};
          }
          h2 {
            font-size: ${_theme.heading[2].size};
          }
          h3 {
            font-size: ${_theme.heading[3].size};
          }
          h4 {
            font-size: ${_theme.heading[4].size};
          }
          h5 {
            font-size: ${_theme.heading[5].size};
          }
          h6 {
            font-size: ${_theme.heading[6].size};
          }
          a {
            color: ${_theme.link.color};
            text-decoration: ${_theme.link.decoration};
          }
          a:hover {
            color: ${_theme.link.hover.color};
            text-decoration: ${_theme.link.hover.decoration};
          }
          a:active {
            color: ${_theme.link.active.color};
            text-decoration: ${_theme.link.active.decoration};
          }
        `}
          </style>
        </Head>
        <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
      </>
    );
  }

  const controller = {
    defaultTheme,
    defaultThemeVars,
    set: (theme: string, themeVars: TThemeIn<T>) => {
      themes[theme] = merge({}, themes[defaultTheme], themeVars);

      return controller;
    },
    get: (theme?: string) => themes[theme] || themes[defaultTheme],
    useThemeContext,
    useTheme,
    ThemeProvider
  };

  return controller;
}
