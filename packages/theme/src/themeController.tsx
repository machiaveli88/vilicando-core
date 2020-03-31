import React from "react";
import { ITheme as IDefaultTheme } from "./types";
import baseTheme from "./theme.json";
import { merge } from "lodash";

export type TThemeIn<T, OptT = {}> = Partial<IDefaultTheme & T & OptT>;
export type TThemeOut<T> = Partial<IDefaultTheme & T>;
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

const defaultSetTheme = () => console.warn("ThemeProvider not found!");

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

  const useThemeContext = (): TThemeContext => React.useContext(ThemeContext);

  const useTheme = (name?: string): TThemeOut<T> => {
    const [theme] = useThemeContext();

    return themes[name] || themes[theme] || themes[defaultTheme];
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
    set: (theme: string, themeVars: TThemeIn<T>) => {
      themes[theme] = merge({}, themes[defaultTheme], themeVars);

      return controller;
    },
    get: (theme?: string) => themes[theme] || themes[defaultTheme],
    useThemeContext,
    useTheme,
    ThemeProvider,
  };

  return controller;
}
