import * as React from 'react';
import { RendererProvider } from 'react-fela';
import { createRenderer, TRuleProps } from 'fela';
import { useFela } from '../theme';

const renderer = createRenderer();

const pulseRing = (): TRuleProps => ({
  '0%': {
    transform: 'scale(.33)'
  },
  '80%, 100%': {
    opacity: 0
  }
});
renderer.renderKeyframe(pulseRing, {});

const pulseDot = (): TRuleProps => ({
  '0%': {
    transform: 'scale(.8)'
  },
  '50%': {
    transform: 'scale(1)'
  },
  '100%': {
    transform: 'scale(.8)'
  }
});
renderer.renderKeyframe(pulseDot, {});

export interface IComponentLoader {
  logo?: string;
  size?: number;
}

function ComponentLoader({ size = 250, logo }: IComponentLoader) {
  const [css, theme] = useFela();

  return (
    <RendererProvider renderer={renderer}>
      <div
        className={css({
          bottom: 0,
          left: 0,
          margin: 0,
          position: 'fixed',
          pointerEvents: 'none',
          right: 0,
          top: 0,
          background: `linear-gradient(135deg, ${theme.colors.primary[7]} 0%,${
            theme.colors.primary[9]
          } 100%)`,
          zIndex: 2000
        })}
      >
        <div
          className={css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            height: size * 3,
            width: size * 3,
            display: 'block',
            marginLeft: -size * 1.5,
            marginTop: -size * 1.5,
            borderRadius: size * 1.5,
            backgroundColor: theme.colors.primary[7],
            animation: `k1 1.25s ${theme.easeOut} infinite`
          })}
        />
        <div
          className={css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            height: size,
            width: size,
            display: 'block',
            marginLeft: -size * 0.5,
            marginTop: -size * 0.5,
            backgroundColor: theme.colors.grey[0],
            borderRadius: size * 0.5,
            boxShadow: theme.boxShadow[1],
            animation: `k2 1.25s ${theme.easeInOut} -.4s infinite`
          })}
        >
          <div
            className={css({
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              display: 'block',
              '> img': {
                width: size,
                height: size
              }
            })}
          >
            {!!logo && <img src={logo} className="App-logo" alt="logo" />}
          </div>
        </div>
        <div
          className={css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            display: 'block',
            color: 'white',
            fontFamily: theme.fontFamily[0],
            fontSize: theme.fontSize[3],
            padding: theme.space[5]
          })}
        >
          <b>Tipp:</b> Trask ist einfach genial!
        </div>
      </div>
    </RendererProvider>
  );
}

ComponentLoader.displayName = 'ComponentLoader';
export default ComponentLoader;
