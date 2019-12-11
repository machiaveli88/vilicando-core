import embedded from 'fela-plugin-embedded';
import fallbackValue from 'fela-plugin-fallback-value';
import namedKeys from './namedKeys';
import normalize from './normalize';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import validator from 'fela-plugin-validator';
import webPreset from 'fela-preset-web';
import typescript from 'fela-plugin-typescript';
import customProperty from './customProperty';
import friendlyPseudoClass from './friendlyPseudoClass';
import { createRenderer, TPlugin } from 'fela';

interface ICreateRenderer {
  plugins?: Array<TPlugin>;
}

export default ({ plugins = [] }: ICreateRenderer) => {
  const renderer = createRenderer({
    plugins: [
      typescript(),
      embedded(),
      prefixer(),
      fallbackValue(),
      unit(),
      namedKeys(),
      customProperty(),
      friendlyPseudoClass(),
      validator(),
      ...webPreset,
      ...plugins
    ]
  });
  renderer.renderStatic(`
    ${normalize}

    #__next {
      min-height: 100%;
      display: flex;
    }
    #__next > * {
      flex-grow: 1;
    }
    
  `);

  return renderer;
};
