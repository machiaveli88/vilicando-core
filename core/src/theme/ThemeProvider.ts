import * as React from 'react';
import tinycolor from 'tinycolor2';
import { camelCase } from 'lodash';
import { IRenderer } from 'fela';
import { useFela as useFelaBase, CssFelaStyle } from 'react-fela';
import { ITheme } from './types';

function colorPalette(color: string, index: number) {
  const hueStep = 2;
  const saturationStep = 16;
  const saturationStep2 = 5;
  const brightnessStep1 = 5;
  const brightnessStep2 = 15;
  const lightColorCount = 5;
  const darkColorCount = 4;

  const isLight = index <= 6;
  const hsv = tinycolor(color).toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const getHue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let hue;
    if (hsv.h >= 60 && hsv.h <= 240) {
      hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
      hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  };

  const getSaturation = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    let saturation;
    if (isLight) {
      saturation = Math.round(hsv.s * 100) - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = Math.round(hsv.s * 100) + saturationStep;
    } else {
      saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
    }
    if (saturation > 100) {
      saturation = 100;
    }
    if (isLight && i === lightColorCount && saturation > 10) {
      saturation = 10;
    }
    if (saturation < 6) {
      saturation = 6;
    }
    return Math.round(saturation);
  };

  const getValue = (
    hsv: { h: number; s: number; v: number },
    i: number,
    isLight: boolean
  ) => {
    if (isLight) {
      return Math.round(hsv.v * 100) + brightnessStep1 * i;
    }
    return Math.round(hsv.v * 100) - brightnessStep2 * i;
  };

  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  }).toHexString();
}

export const replaceLessVars = (theme: object): object => {
  const newTheme: object = { ...theme };
  Object.keys(theme).forEach(key => {
    if (typeof theme[key] === 'string') {
      // @var +- something
      if (theme[key].indexOf('ceil(') < 0)
        newTheme[key] = theme[key].replace(
          /\(?\@[a-z0-9]+(-[a-z0-9]*)* [\+\-\*] (.+)\w\)?/g,
          (match: string) => `calc(${match})`
        );

      // @var
      newTheme[key] = newTheme[key].replace(
        /\@\{?[a-z0-9]+(-[a-z0-9]*)*\}?/g,
        (match: string) =>
          newTheme[match.replace(/\@\{?/g, '').replace(/\}?/g, '')]
      );

      // string => int
      if (`${parseInt(theme[key])}` === theme[key])
        newTheme[key] = parseInt(newTheme[key]);
    }
  });

  // detect and replace nested vars
  const stringifiedTheme = JSON.stringify(newTheme);
  if (
    stringifiedTheme.indexOf('@') >= 0 &&
    JSON.stringify(theme) !== stringifiedTheme
  )
    return replaceLessVars(newTheme);

  return newTheme;
};

export const parseTheme = (theme: object): ITheme => {
  const newTheme = {};

  Object.keys(theme).forEach(key => {
    if (typeof theme[key] === 'string') {
      // hsv()
      theme[key] = theme[key].replace(/hsv\(.+\)/g, (match: string) =>
        tinycolor(match).toRgbString()
      );

      // hsl()
      theme[key] = theme[key].replace(/hsl\(.+\)/g, (match: string) =>
        tinycolor(match).toRgbString()
      );

      // fade()
      theme[key] = theme[key].replace(
        /fade\(([^,]+),([^,]+)\)/g,
        (match: string, color: string, alpha: string) =>
          tinycolor(color)
            .setAlpha(parseInt(alpha) / 100)
            .toRgbString()
      );

      // tint()
      theme[key] = theme[key].replace(
        /tint\(([^,]+),([^,]+)\)/g,
        (match: string, color: string, weight: string) =>
          tinycolor(color)
            .lighten(parseInt(weight))
            .toRgbString()
      );

      // colorPalette
      theme[key] = theme[
        key
      ].replace(
        /(color\()?\~\`colorPalette\(\'([^,]+)\',([^,]+)\)[ ]?\`\)?/g,
        (match: string, stuff: string, color: string, index: string) =>
          colorPalette(color, parseInt(index))
      );

      // ceil()
      theme[key] = theme[key].replace('ceil', 'calc');
    }

    newTheme[camelCase(key)] = theme[key];
  });

  return newTheme as ITheme;
};

export const ThemeContext = React.createContext({});

export function useFela<T = {}, P = {}>(): {
  css: (css: CssFelaStyle<T, P>, className?: string) => string;
  theme: ITheme;
  renderer: IRenderer;
} {
  const theme = React.useContext(ThemeContext);
  const { css, renderer } = useFelaBase<T, P>();

  // replacing @-vars & functions with values
  const parsedTheme = React.useMemo(() => parseTheme(replaceLessVars(theme)), [
    theme
  ]);

  return {
    css: (styles: CssFelaStyle<T, P>, className?: string) =>
      className ? css(styles) + ' ' + className : css(styles),
    theme: parsedTheme,
    renderer
  };
}

export default ThemeContext.Provider;
