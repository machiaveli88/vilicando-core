import { IStyle } from 'fela';
import { useFela, StyleFunction, FelaHookProps } from 'react-fela';
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

export interface IUseFela<T = {}, P = {}>
  extends Omit<FelaHookProps<T, P>, 'css'> {
  css: (
    css: IStyleExtended | StyleFunction<T, P>,
    className?: string
  ) => string;
}

// without typescript autocomplete
export function useFelaBase<T = {}, P = {}>(): IUseFela<T, P> {
  const { css, ...rest } = useFela<T, P>();

  return {
    css: (s, cn) => (cn ? `${css(s)} ${cn}` : css(s)),
    ...rest
  };
}

// with typescript autocomplete for theme
export default () => useFelaBase<ITheme>();
