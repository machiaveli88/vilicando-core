import React from "react";
import {
  themeController as _themeController,
  TFont,
  THeading,
  TThemeIn,
  IThemeController,
  IThemeProvider,
} from "vilicando-theme";
import Head from "next/head";

export * from "vilicando-theme";

const parsePx = (val: string | number) =>
  typeof val === "number" ? `${val}px` : val;

const getFont = (font: TFont) => `
  color: ${font.color};
  font-family: ${font.fontFamily};
  font-size: ${parsePx(font.fontSize)};
  font-style: ${font.fontStyle};
  font-weight: ${font.fontWeight};
  text-align: ${font.textAlign};
  text-decoration-line: ${font.textDecorationLine};
  text-decoration-style: ${font.textDecorationStyle};
  text-decoration-color: ${font.textDecorationColor};
  text-transform: ${font.textTransform};
  letter-spacing: ${parsePx(font.letterSpacing)};
  line-height: ${font.lineHeight};
`;
const getHeading = ({ marginTop, marginBottom, ...font }: THeading) => `
  ${getFont(font)}
  margin-top: ${parsePx(marginTop)};
  margin-bottom: ${parsePx(marginBottom)};
`;

export function themeController<T>(
  nameOrVars?: string | TThemeIn<T>,
  vars?: TThemeIn<T>
): IThemeController<T> {
  const {
    defaultTheme,
    ThemeProvider,
    useTheme,
    useThemeContext,
    ...rest
  } = _themeController(nameOrVars, vars);

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
                  font-family: ${themeVars.font.base.fontFamily};
                  font-size: ${parsePx(themeVars.font.base.fontSize)};
                  color: ${themeVars.font.base.color};
                }
                body {
                  background-color: ${themeVars.app.background};
                  ${getFont(themeVars.font.base)}
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
                p {
                  margin-top: 0;
                  margin-bottom: ${parsePx(themeVars.spacing.md)};
                }
                h1 {
                  ${getHeading(themeVars.heading[1])}
                }
                h2 {
                  ${getHeading(themeVars.heading[2])}
                }
                h3 {
                  ${getHeading(themeVars.heading[3])}
                }
                h4 {
                  ${getHeading(themeVars.heading[4])}
                }
                h5 {
                  ${getHeading(themeVars.heading[5])}
                }
                h6 {
                  ${getHeading(themeVars.heading[6])}
                }
                a {
                  ${getFont(themeVars.link.base)}
                }
                a:hover {
                  ${getFont(themeVars.link.hover)}
                }
                a:active {
                  ${getFont(themeVars.link.active)}
                }
                a:focus {
                  ${getFont(themeVars.link.focus)}
                }
                code {
                  background-color: ${themeVars.palette.primary[1]};
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

  return {
    defaultTheme,
    useTheme,
    useThemeContext,
    ...rest,
    ThemeProvider: CoreThemeProvider,
  };
}
