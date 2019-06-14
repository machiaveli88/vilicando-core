import * as React from 'react';
import { useFela as useFelaBase } from 'react-fela';

export const ThemeContext = React.createContext({});

export const useTheme = () => React.useContext(ThemeContext);

export const useFela = (): [(css: object) => string, any] => {
  const theme = React.useContext(ThemeContext);
  const { css } = useFelaBase();

  return [css, theme];
};

export default ThemeContext.Provider;
