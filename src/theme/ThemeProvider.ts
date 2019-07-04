import * as React from 'react';
import { useFela as useFelaBase } from 'react-fela';

const parseTheme = (theme: object) => {
  Object.keys(theme).forEach(key => {
    theme[key] = theme[key].replace(
      /(\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?)/g,
      (match: string) => {
        const removeBraces = match.replace('@{', '@').replace('}', '');

        return theme[removeBraces.substring(1)];
      }
    );
  });

  return theme;
};

export const ThemeContext = React.createContext({});

export const useTheme = () => React.useContext(ThemeContext);

export const useFela = (): [(css: object) => string, any] => {
  const theme = React.useContext(ThemeContext);
  const { css } = useFelaBase();

  // replacing @-vars with values
  const parsedTheme = React.useMemo(
    // 3-fach damit auch nested Variablen ersetzt werden!
    () => parseTheme(parseTheme(parseTheme(theme))),
    [theme]
  );

  return [css, parsedTheme];
};

export default ThemeContext.Provider;
