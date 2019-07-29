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
        // From
        ifHugeUp: '@media (min-width: 1200px)',
        ifLargeUp: '@media (min-width: 992px)',
        ifMediumUp: '@media (min-width: 768px)',
        ifSmallUp: '@media (min-width: 480px)',
        // To
        ifLargeDown: '@media (max-width: 1199px)',
        ifMediumDown: '@media (max-width: 991px)',
        ifSmallDown: '@media (max-width: 767px)',
        // On
        ifHuge: '@media (min-width: 1200px)',
        ifLarge: '@media (max-width: 1199px, min-width: 992)',
        ifMedium: '@media (max-width: 991px, min-width: 768)',
        ifSmall: '@media (max-width: 767px, min-width: 480)',
        ifMini: '@media (max-width: 479px)'
      }),
      /* customProperty({
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
      }), */
      // friendlyPseudoClass(),
      validator(),
      ...webPreset,
      ...plugins
    ]
  });

  renderer.renderStatic(`
    ${normalize}

    #__next {
      height: 100%;
    }

    ${css}
  `);

  return renderer;
};
