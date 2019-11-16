import * as React from 'react';
import { IRenderer, IStyle } from 'fela';
import { useFela as useFelaBase, StyleFunction } from 'react-fela';
import { ITheme } from './types';
import { ICustomProperty } from './customProperty';
import { INamedKeys } from './namedKeys';
import { IFriendlyPseudoClass } from './friendlyPseudoClass';
import defaultTheme from './theme.json';

const ThemeContext = React.createContext<Partial<ITheme>>(defaultTheme);

interface IStyleExtended
  extends Omit<IStyle, 'nested'>,
    ICustomProperty,
    INamedKeys<IStyleExtended>,
    IFriendlyPseudoClass<IStyleExtended> {
  [property: string]: IStyleExtended | string | number | boolean;
}

export function useFela<P = {}>(): {
  css: (
    css: IStyleExtended | StyleFunction<ITheme, P>,
    className?: string
  ) => string;
  theme: ITheme;
  renderer: IRenderer;
} {
  const theme = Object.assign(defaultTheme, React.useContext(ThemeContext));
  const { css, renderer } = useFelaBase<ITheme, P>();

  // default styles
  renderer.renderStatic(
    {
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSizeMd,
      color: theme.black
    },
    'html,body'
  );
  renderer.renderStatic({ color: theme.headingColor }, 'h1,h2,h3,h4,h5,h6');
  renderer.renderStatic({ fontSize: theme.heading1Size }, 'h1');
  renderer.renderStatic({ fontSize: theme.heading2Size }, 'h2');
  renderer.renderStatic({ fontSize: theme.heading3Size }, 'h3');
  renderer.renderStatic({ fontSize: theme.heading4Size }, 'h4');
  renderer.renderStatic({ fontSize: theme.heading5Size }, 'h5');
  renderer.renderStatic({ fontSize: theme.heading6Size }, 'h6');

  return {
    css: (
      styles: IStyleExtended | StyleFunction<ITheme, P>,
      className?: string
    ) => (className ? css(styles) + ' ' + className : css(styles)),
    theme,
    renderer
  };
}

export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext.Provider;
