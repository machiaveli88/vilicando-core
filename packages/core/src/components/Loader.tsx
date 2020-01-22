import React from 'react';
import { TRuleProps } from 'fela';
import { useFela } from '../theme';
import { useConfig } from '../AppProvider';

export interface IComponentLoader {
  children?: React.ReactNode | Array<React.ReactNode>;
  size?: number;
  text?: string | React.ReactNode;
}

function Loader({ size = 250, children, text }: IComponentLoader) {
  const { css, theme, renderer } = useFela();
  const { loader, logo } = useConfig();
  const content =
    children ||
    (!!loader && <img src={`/${loader}`} alt="loader" />) ||
    (!!logo && <img src={`/${logo}`} alt="logo" />);

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
    <div>
      {/* need this unneccassary div, because if dynamic is used with onSSR => inner divs className is missing!!!! */}
      <div
        className={css({
          bottom: 0,
          left: 0,
          margin: 0,
          position: 'fixed',
          pointerEvents: 'none',
          right: 0,
          top: 0,
          background: `linear-gradient(135deg, ${theme.primary[6]} 0%,${theme.primary[8]} 100%)`,
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
            backgroundColor: theme.primary[6],
            animation: `${pulseRing} 1.25s ${theme.ease.out} infinite`
          })}
        />
        {!!content && (
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
              boxShadow: theme.shadow[2],
              animation: `${pulseDot} 1.25s ${theme.ease.inOut} -.4s infinite`
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
              {content}
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
              fontFamily: theme.font.family,
              fontSize: theme.font.size.lg,
              paddingY: theme.spacing.xl
            })}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Loader;
