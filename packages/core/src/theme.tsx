import React from "react";
import {
  themeController as _themeController,
  TThemeIn,
  IThemeController,
  IThemeProvider,
} from "vilicando-theme";
import Head from "next/head";

export * from "vilicando-theme";

export function themeController<T>(
  nameOrVars?: string | TThemeIn<T>,
  vars?: TThemeIn<T>
): IThemeController<T> {
  const tcVars = _themeController(nameOrVars, vars);
  const { defaultTheme, ThemeProvider, useTheme, useThemeContext } = tcVars;

  function CoreThemeProvider(props: IThemeProvider) {
    const { theme: _theme, setTheme: _setTheme } = props;
    const [theme, setTheme] = React.useState<string>(_theme || defaultTheme);
    const themeVars = useTheme(_theme || theme);
    const [activeTheme] = useThemeContext();

    return (
      <>
        {activeTheme === (_theme || defaultTheme) && (
          <Head>
            <style>
              {`
                html,
                body {
                  width: 100%;
                  height: 100%;
                  font-family: ${themeVars.font.family};
                  font-size: ${themeVars.font.size.md};
                  color: ${themeVars.black};
                }
                body {
                  background-color: ${themeVars.app.background};
                }
                #__next {
                  width: 100%;
                  min-height: 100%;
                  display: flex;
                  flex-direction: column;
                  background-color: ${themeVars.app.foreground};
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
                  color: ${themeVars.heading.color};
                }
                h1 {
                  font-size: ${themeVars.heading[1].size};
                }
                h2 {
                  font-size: ${themeVars.heading[2].size};
                }
                h3 {
                  font-size: ${themeVars.heading[3].size};
                }
                h4 {
                  font-size: ${themeVars.heading[4].size};
                }
                h5 {
                  font-size: ${themeVars.heading[5].size};
                }
                h6 {
                  font-size: ${themeVars.heading[6].size};
                }
                a {
                  color: ${themeVars.link.color};
                  text-decoration: ${themeVars.link.decoration};
                }
                a:hover {
                  color: ${themeVars.link.hover.color};
                  text-decoration: ${themeVars.link.hover.decoration};
                }
                a:active {
                  color: ${themeVars.link.active.color};
                  text-decoration: ${themeVars.link.active.decoration};
                }
                code {
                  background-color: ${themeVars.primary[1]};
                  padding-left: ${themeVars.spacing.xxs};
                  padding-right: ${themeVars.spacing.xxs};
                }
              `}
            </style>
          </Head>
        )}
        <ThemeProvider
          {...props}
          theme={_theme || theme}
          setTheme={_setTheme || setTheme}
        />
      </>
    );
  }

  return { ...tcVars, ThemeProvider: CoreThemeProvider };
}
