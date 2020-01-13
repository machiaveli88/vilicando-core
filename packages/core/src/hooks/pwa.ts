import React from 'react';
import { useFela } from '../theme';

export default function usePWA() {
  const { renderer } = useFela();

  React.useEffect(() => {
    // @ts-ignore
    renderer.renderStatic(
      {
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      },
      '*'
    );
    renderer.renderStatic(
      {
        userSelect: 'none'
      },
      'html'
    );
    renderer.renderStatic(
      {
        position: 'fixed',
        overscrollBehavior: 'none'
      },
      'body'
    );
    renderer.renderStatic(
      {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'auto'
      },
      '#__next'
    );
  }, []);
}
