import { IRenderer, IStyle } from 'fela';
import { useFela as useFelaBase, StyleFunction } from 'react-fela';
import { ITheme } from './types';
import { ICustomProperty } from './customProperty';
import { INamedKeys } from './namedKeys';
import { IFriendlyPseudoClass } from './friendlyPseudoClass';

export interface IStyleExtended
  extends Omit<IStyle, 'nested'>,
    ICustomProperty,
    INamedKeys<IStyleExtended>,
    IFriendlyPseudoClass<IStyleExtended> {
  [property: string]: IStyleExtended | string | number | boolean;
}

export interface IUseFela<T = {}, P = {}> {
  css: (
    css: IStyleExtended | StyleFunction<T & ITheme, P>,
    className?: string
  ) => string;
  theme: T & ITheme;
  renderer: IRenderer;
}

export default function useFela<T = {}, P = {}>(): IUseFela<T> {
  const { theme, css, renderer } = useFelaBase<T & ITheme, P>();

  return {
    css: (
      styles: IStyleExtended | StyleFunction<T & ITheme, P>,
      className?: string
    ) => (className ? css(styles) + ' ' + className : css(styles)),
    theme,
    renderer
  };
}
