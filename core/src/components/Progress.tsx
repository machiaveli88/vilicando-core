import * as React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { RendererProvider } from 'react-fela';
import { TRuleProps } from 'fela';
import { useFela } from '../theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function Progress({ children }: any) {
  const [css, theme, renderer] = useFela();
  const color = theme['primary-color'];

  renderer.renderStatic(`
    /* Make clicks pass-through */
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${color};

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
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
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
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;

      animation: k1 400ms linear infinite;
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

  const nprogressSpinner = (): TRuleProps => ({
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  });
  renderer.renderKeyframe(nprogressSpinner, {});

  return <RendererProvider renderer={renderer}>{children}</RendererProvider>;
}

export default Progress;
