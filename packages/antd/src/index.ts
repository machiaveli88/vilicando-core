export { default as AntdProvider, IAntdProvider } from './AntdProvider';
export { default as useFela } from './useFela';

// export { default as theme } from './theme.json'; => doesn't work!
import _theme from './theme.json';
export const theme = _theme;
