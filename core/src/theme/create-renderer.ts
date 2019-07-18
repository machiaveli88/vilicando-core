import embedded from 'fela-plugin-embedded';
import fallbackValue from 'fela-plugin-fallback-value';
import namedKeys from 'fela-plugin-named-keys';
import normalize from './normalize';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import validator from 'fela-plugin-validator';
import webPreset from 'fela-preset-web';
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
