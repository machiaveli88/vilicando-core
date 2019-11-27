import React from 'react';
import NProgress from 'nprogress';
import { Router } from '../next';
import { TRuleProps } from 'fela';
import { useFela } from '../theme';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

interface IProgress {
  children: React.ReactNode;
  color?: string;
}

function Progress({ children, color }: IProgress) {
  const { theme, renderer } = useFela();
  const _color = color || theme['color'] || theme.secondaryColor;

  const keyframe = (): TRuleProps => ({
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  });
  const nprogressSpinner = renderer.renderKeyframe(keyframe, {});

  renderer.renderStatic(`
    /* Make clicks pass-through */
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${_color};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${_color}, 0 0 5px ${_color};
      opacity: 1;

      transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${_color};
      border-left-color: ${_color};
      border-radius: 50%;

      animation: ${nprogressSpinner} 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }
  `);

  return <>{children}</>;
}

export default Progress;
