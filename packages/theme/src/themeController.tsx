import React from "react";
import { ITheme, TBorder, TBoxShadow, TTextShadow, TFont } from "./types";
import baseTheme from "./theme";
import { merge } from "lodash";
import tinycolor from "tinycolor2";

const defaultSetTheme = () => console.warn("ThemeProvider not found!");

function getThemeValues<T>(
  values: { base?: T; [k: string]: T },
  toObject: (val: T) => object = () => ({}),
  toString: (val: T) => string = () => undefined
) {
  const _values = {};
  Object.keys(values).forEach(key => {
    const base = merge({}, values.base, values[key]);

    _values[key] = {
      ...base,
      toObject: () => toObject(base),
      toString: () => toString(base),
    };
  });

  return _values;
}

function getFonts(values: { base?: TFont; [k: string]: TFont }) {
  const fonts = {};
  Object.keys(values).forEach(font => {
    const d = { ...values.base.textDecoration, ...values[font].textDecoration };

    fonts[font] = {
      ...values[font],
      textDecoration: {
        ...values.base.textDecoration,
        toObject: () => ({
          textDecorationLine: d.textDecorationLine,
          textDecorationStyle: d.textDecorationStyle,
          textDecorationColor: d.textDecorationColor,
        }),
        toString: () =>
          `${d.textDecorationLine} ${d.textDecorationStyle} ${d.textDecorationColor}`,
        ...values[font].textDecoration,
      },
    };
  });

  return getThemeValues<TFont>(fonts, ({ textDecoration, ...rest }) => ({
    ...textDecoration.toObject(),
    ...rest,
  }));
}

export type TThemeIn<T, OptT = {}> = Partial<ITheme & T & OptT>;
export type TThemeOut<T> = Partial<ITheme & T>;
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

  const defaultContext: TThemeContext = [defaultTheme, defaultSetTheme];
  const ThemeContext = React.createContext<TThemeContext>(defaultContext);

  const themes: { [k: string]: TThemeIn<T> } = {};
  themes[defaultTheme] = merge({}, baseTheme, defaultThemeVars);

  const set = (theme: string, themeVars: TThemeIn<T>) => {
    themes[theme] = merge({}, themes[defaultTheme], themeVars);

    return controller;
  };
  const get = (theme?: string) => {
    const t = themes[theme] || themes[defaultTheme];

    const boxShadow = getThemeValues<TBoxShadow>(
      t.boxShadow,
      ({ color, offset, opacity, blur }) => ({
        shadowColor: color,
        shadowOffset: {
          width: offset?.x,
          height: offset?.y,
        },
        shadowOpacity: opacity,
        shadowRadius: blur,
      }),
      ({ inset, color, offset, opacity, blur, spread }) =>
        `${inset ? "inset " : ""}${offset?.x}px ${
          offset?.y
        }px ${blur}px ${spread}px ${tinycolor(color)
          .setAlpha(opacity)
          .toRgbString()}`
    );
    const textShadow = getThemeValues<TTextShadow>(
      t.textShadow,
      ({ color, offset, blur }) => ({
        textShadowColor: color,
        textShadowOffset: {
          width: offset?.x,
          height: offset?.y,
        },
        textShadowRadius: blur,
      }),
      ({ color, offset, blur }) =>
        `${offset?.x}px ${offset?.y}px ${blur}px ${color}`
    );
    const border = getThemeValues<TBorder>(
      t.border,
      props => props,
      ({ borderWidth, borderStyle, borderColor }) =>
        `${borderWidth}px ${borderStyle} ${borderColor}`
    );
    const font = getFonts(t.font);
    const heading = getFonts(t.heading);
    const link = getFonts(t.link);

    return {
      ...t,
      boxShadow,
      textShadow,
      border,
      font,
      heading,
      link,
    };
  };

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
