import { IStyle } from "fela";
import {
  useFela as useFelaBase,
  StyleFunction,
  FelaHookProps,
} from "react-fela";
import { ITheme } from "vilicando-core";
import { ICustomProperty } from "./customProperty";
import { INamedKeys } from "./namedKeys";
import { IFriendlyPseudoClass } from "./friendlyPseudoClass";

export interface IStyleExtended
  extends Omit<IStyle, "nested">,
    ICustomProperty,
    INamedKeys<IStyleExtended>,
    IFriendlyPseudoClass<IStyleExtended> {
  [property: string]: IStyleExtended | string | number | boolean;
}

export interface IUseFela<T = {}, P = {}>
  extends Omit<FelaHookProps<T, P>, "css"> {
  css: (
    css: IStyleExtended | StyleFunction<T, P>,
    className?: string
  ) => string;
}

export default function useFela<T = ITheme, P = {}>(props?: P): IUseFela<T, P> {
  const { css, ...rest } = useFelaBase<T, P>(props);

  return {
    css: (s, cn) => (cn ? `${css(s)} ${cn}` : css(s)),
    ...rest,
  };
}
