import React from "react";
import {
  TThemeIn,
  TThemeOut,
  TBoxShadow,
  TTextShadow,
  TBorder,
  TFont,
} from "./types";
import baseTheme from "./theme";
import { merge } from "lodash";
import tinycolor from "tinycolor2";

const defaultSetTheme = () => console.warn("ThemeProvider not found!");

function getThemeValues<T>(
  values: { [k: string]: T },
  defaultValues: { [k: string]: Required<T> },
  toString?: (val: T) => string
): { [k: string]: Required<T> } {
  const _values = {};

  Object.keys(merge({}, values, defaultValues)).forEach((key) => {
    _values[key] = merge({}, defaultValues?.[key], values?.base, values?.[key]);
    if (toString) _values[key].toString = () => toString(_values[key]);
  });

  return _values;
}

type TThemeContext = [string, React.Dispatch<React.SetStateAction<string>>];

export interface IThemeProvider {
  children: React.ReactNode | Array<React.ReactNode>;
  theme?: string;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IThemeController<T> {
  defaultTheme: string;
  defaultThemeVars: TThemeIn<T>;
  set: (theme: string, themeVars: TThemeIn<T>) => IThemeController<T>;
  get: (theme?: string) => TThemeOut<T>;
  useThemeContext: () => TThemeContext;
  useTheme: (theme?: string) => TThemeOut<T>;
  ThemeProvider: ({ children, theme }: IThemeProvider) => JSX.Element;
}

export default function themeController<T>(
  nameOrVars?: string | TThemeIn<T>,
  vars?: TThemeIn<T>
): IThemeController<T> {
  let defaultTheme = "default";
  let defaultThemeVars = vars;
  if (typeof nameOrVars === "string") defaultTheme = nameOrVars as string;
  else defaultThemeVars = nameOrVars;

  const parseTheme = (values: TThemeIn<T>) => {
    const boxShadow = getThemeValues<TBoxShadow>(
      values?.boxShadow,
      baseTheme.boxShadow,
      ({ shadowOffset, shadowColor, shadowOpacity, shadowRadius }) =>
        `${shadowOffset?.width}px ${
          shadowOffset?.height
        }px ${shadowRadius}px ${tinycolor(shadowColor)
          .setAlpha(shadowOpacity)
          .toRgbString()}`
    );
    const textShadow = getThemeValues<TTextShadow>(
      values?.textShadow,
      baseTheme.textShadow,
      ({ textShadowColor, textShadowOffset, textShadowRadius }) =>
        `${textShadowOffset?.width}px ${textShadowOffset?.height}px ${textShadowRadius}px ${textShadowColor}`
    );
    const border = getThemeValues<TBorder>(
      values?.border,
      baseTheme.border,
      ({ borderWidth, borderStyle, borderColor }) =>
        `${borderWidth}px ${borderStyle} ${borderColor}`
    );
    const font = getThemeValues<TFont>(values?.font, baseTheme.font);
    const heading = getThemeValues<TFont>(values?.heading, baseTheme.heading);
    const link = getThemeValues<TFont>(values?.link, baseTheme.link);

    return merge({}, baseTheme, {
      ...values,
      boxShadow,
      textShadow,
      border,
      font,
      heading,
      link,
    }) as TThemeOut<T>;
  };

  const defaultContext: TThemeContext = [defaultTheme, defaultSetTheme];
  const ThemeContext = React.createContext<TThemeContext>(defaultContext);
  const themes = { [defaultTheme]: parseTheme(defaultThemeVars) };

  const set = (theme: string, themeVars: TThemeIn<T>) => {
    themes[theme] = parseTheme(themeVars);

    return controller;
  };
  const get = (theme?: string) => themes[theme] || themes[defaultTheme];
  const useThemeContext = (): TThemeContext => React.useContext(ThemeContext);
  const useTheme = (name?: string) => {
    const [theme] = useThemeContext();

    return get(name || theme);
  };
  function ThemeProvider({
    children,
    theme: _theme,
    setTheme: _setTheme,
  }: IThemeProvider) {
    const [theme, setTheme] = React.useState<string>(_theme || defaultTheme);

    return (
      <ThemeContext.Provider value={[_theme || theme, _setTheme || setTheme]}>
        {children}
      </ThemeContext.Provider>
    );
  }

  const controller = {
    defaultTheme,
    defaultThemeVars,
    set,
    get,
    useThemeContext,
    useTheme,
    ThemeProvider,
  };

  return controller;
}
