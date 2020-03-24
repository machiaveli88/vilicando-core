export { ITheme } from './types';
export {
  default as themeController,
  IThemeController,
  IThemeProvider,
  TThemeIn,
  TThemeOut,
} from './themeController';

// export { default as theme } from './theme.json'; => doesn't work! see https://github.com/webpack/webpack/issues/6700
import { ITheme } from './types';
import _theme from './theme.json';
export const theme: ITheme = _theme;
