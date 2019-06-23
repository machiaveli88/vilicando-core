import { LESSPlugin } from 'fuse-box';
import theme from './theme';

const getColor = (name: string) => {
  const obj = {};

  // @ts-ignore
  theme.colors[name].forEach((color: string, i: number) => {
    // @ts-ignore
    if (i) obj[`${name}-${i}`] = color;
  });

  return obj;
};

export default (paths?: string[]) =>
  LESSPlugin({
    // @ts-ignore
    paths,
    javascriptEnabled: true,
    modifyVars: {
      ...getColor('blue'),
      ...getColor('green'),
      ...getColor('orange'),
      ...getColor('red'),
      ...getColor('yellow'),
      ...getColor('grey'),
      ...getColor('primary'),
      'info-color': theme.colors.blue[2],
      'success-color': theme.colors.green[0],
      'error-color': theme.colors.red[0],
      'warning-color': theme.colors.orange[0],
      white: theme.colors.grey[0],
      black: theme.colors.grey[10],
      'font-family': theme.fontFamily[0],
      'font-size-base': theme.fontSize[0],
      'font-size-lg': theme.fontSize[4],
      'font-size-sm': theme.fontSize[1],
      'shadow-color1': theme.boxShadowColor[0],
      'shadow-color2': theme.boxShadowColor[1],
      'shadow-1': theme.boxShadow[0],
      'shadow-2': theme.boxShadow[0],
      'border-radius-base': theme.borderRadius[0],
      'border-radius-sm': theme.borderRadius[0],
      'layout-header-height': theme.layoutHeaderHeight,
      'ease-out': theme.easeOut,
      'ease-in-out': theme.easeInOut,
      'screen-xs': theme.breakpoints[0],
      'screen-sm': theme.breakpoints[1],
      'screen-md': theme.breakpoints[2],
      'screen-lg': theme.breakpoints[3],
      'screen-xl': theme.breakpoints[4],
      'screen-xxl': theme.breakpoints[5]
    }
  });
