import embedded from 'fela-plugin-embedded';
import fallbackValue from 'fela-plugin-fallback-value';
import namedKeys from 'fela-plugin-named-keys';
import normalize from './normalize';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import validator from 'fela-plugin-validator';
import webPreset from 'fela-preset-web';
import customProperty from 'fela-plugin-custom-property';
import friendlyPseudoClass from 'fela-plugin-friendly-pseudo-class';
import { createRenderer, TPlugin } from 'fela';

const sizes = {
  extraLarge: 1600,
  huge: 1200,
  large: 992,
  medium: 768,
  small: 576,
  mini: 480
};

interface ICreateRenderer {
  plugins?: Array<TPlugin>;
  css?: string;
}

export default ({ plugins = [], css = '' }: ICreateRenderer) => {
  const renderer = createRenderer({
    plugins: [
      embedded(),
      prefixer(),
      fallbackValue(),
      unit(),
      namedKeys({
        // From (z.B. hugeUp: x >= huge)
        ifHugeUp: `@media only screen and (max-width: ${sizes.extraLarge}px)`,
        ifExtraLargeUp: `@media only screen and (max-width: ${sizes.huge}px)`,
        ifLargeUp: `@media only screen and (max-width: ${sizes.large}px)`,
        ifMediumUp: `@media only screen and (max-width: ${sizes.medium}px)`,
        ifSmallUp: `@media only screen and (max-width: ${sizes.small}px)`,
        ifExtraSmallUp: `@media only screen and (max-width: ${sizes.mini}px)`,
        // To (z.B. hugeDown: x <= huge)
        ifExtraLargeDown: `@media only screen and (max-width: ${sizes.extraLarge -
          1}px)`,
        ifLargeDown: `@media only screen and (max-width: ${sizes.huge - 1}px)`,
        ifMediumDown: `@media only screen and (max-width: ${sizes.large -
          1}px)`,
        ifSmallDown: `@media only screen and (max-width: ${sizes.medium -
          1}px)`,
        ifExtraSmallDown: `@media only screen and (max-width: ${sizes.small -
          1}px)`,
        ifMiniDown: `@media only screen and (max-width: ${sizes.mini - 1}px)`,
        // On
        ifHuge: `@media only screen and (min-width: ${sizes.extraLarge}px)`,
        ifExtraLarge: `@media only screen and (max-width: ${sizes.extraLarge -
          1}px) and (min-width: ${sizes.huge}px)`,
        ifLarge: `@media only screen and (max-width: ${sizes.huge -
          1}px) and (min-width: ${sizes.large}px)`,
        ifMedium: `@media only screen and (max-width: ${sizes.large -
          1}px) and (min-width: ${sizes.medium}px)`,
        ifSmall: `@media only screen and (max-width: ${sizes.medium -
          1}px) and (min-width: ${sizes.small}px)`,
        ifExtraSmall: `@media only screen and (max-width: ${sizes.small -
          1}px) and (min-width: ${sizes.mini}px)`,
        ifMini: `@media only screen and (max-width: ${sizes.mini - 1}px)`
      }),
      customProperty({
        size: size => ({
          width: size,
          height: size
        }),
        paddingX: (padding: number | string) => ({
          paddingLeft: padding,
          paddingRight: padding
        }),
        paddingY: (padding: number | string) => ({
          paddingTop: padding,
          paddingBottom: padding
        }),
        marginX: (margin: number | string) => ({
          marginLeft: margin,
          marginRight: margin
        }),
        marginY: (margin: number | string) => ({
          marginTop: margin,
          marginBottom: margin
        }),
        borderX: (border: string) => ({
          borderLeft: border,
          borderRight: border
        }),
        borderY: (border: string) => ({
          borderTop: border,
          borderBottom: border
        }),
        ellipsis: (ellipsis: boolean) =>
          ellipsis === true
            ? {
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }
            : {},
        clearfix: (clearfix: boolean) =>
          clearfix === true
            ? {
                ':after': {
                  content: '""',
                  clear: 'both',
                  display: 'block',
                  visibility: 'hidden',
                  height: 0
                }
              }
            : {},
        center: (center: boolean) =>
          center === true
            ? {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }
            : {},
        centerX: (center: boolean) =>
          center === true
            ? {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }
            : {},
        centerY: (center: boolean) =>
          center === true
            ? {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)'
              }
            : {},
        flexWidth: (width: number | string) => ({
          maxWidth: width,
          minWidth: width,
          width
        })
      }),
      friendlyPseudoClass(),
      validator(),
      ...webPreset,
      ...plugins
    ]
  });

  renderer.renderStatic(`
    ${normalize}

    html, body {
      height: 100%;
      width: 100%;
      position: fixed;
      overflow: hidden;
      user-select: none;
    }

    #__next {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      min-height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    ${css}
  `);

  return renderer;
};
