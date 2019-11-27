import * as React from 'react';
import { TRuleProps } from 'fela';
import { useFela } from '../theme';

export interface IComponentLoader {
  children?: React.ReactNode;
  size?: number;
  text?: string | React.ReactNode;
}

function Loader({ size = 250, children, text }: IComponentLoader) {
  const { css, theme, renderer } = useFela();

  const pulseRingKeyframe = (): TRuleProps => ({
    '0%': {
      transform: 'scale(.33)'
    },
    '80%, 100%': {
      opacity: 0
    }
  });
  const pulseRing = renderer.renderKeyframe(pulseRingKeyframe, {});

  const pulseDotKeyframe = (): TRuleProps => ({
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
  const pulseDot = renderer.renderKeyframe(pulseDotKeyframe, {});

  return (
    <div
      className={css({
        bottom: 0,
        left: 0,
        margin: 0,
        position: 'fixed',
        pointerEvents: 'none',
        right: 0,
        top: 0,
        background: `linear-gradient(135deg, ${theme.primary7} 0%,${theme.primary9} 100%)`,
        zIndex: 1030
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
          backgroundColor: theme.primary7,
          animation: `${pulseRing} 1.25s ${theme.easeOut} infinite`
        })}
      />
      {!!children && (
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
            backgroundColor: theme.white,
            borderRadius: size * 0.5,
            boxShadow: theme.shadow2,
            animation: `${pulseDot} 1.25s ${theme.easeInOut} -.4s infinite`
          })}
        >
          <div
            className={css({
              center: true,
              '> *': {
                width: size,
                height: size
              }
            })}
          >
            {children}
          </div>
        </div>
      )}
      {!!text && (
        <div
          className={css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            display: 'block',
            color: 'white',
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizeLg,
            paddingY: theme.spacingXl
          })}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default Loader;
