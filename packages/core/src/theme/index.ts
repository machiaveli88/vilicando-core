export { ITheme } from './types';
export {
  default as themeController,
  IThemeController,
  IThemeProvider,
  TThemeIn,
  TThemeOut
} from './themeController';

// export { default as theme } from './theme.json'; => doesn't work! see https://github.com/webpack/webpack/issues/6700
import _theme from './theme.json';
export const theme = _theme;
