export { default as FelaProvider } from './FelaProvider';
export { default as useFela, IStyleExtended, IUseFela } from './useFela';
export { ITheme } from './types';
export { default as createRenderer } from './createRenderer';
export { default as defaultRenderer } from './defaultRenderer';
export { ThemeProvider, RendererProvider } from 'react-fela';

// export { default as theme } from './theme.json'; => doesn't work!
import _theme from './theme.json';
export const theme = _theme;
