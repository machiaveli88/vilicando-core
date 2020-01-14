import React from 'react';
import { useFela } from '.';
import Head from 'next/head';

interface IPWAProvider {
  children?: React.ReactNode | Array<React.ReactNode>;
}

export default function PWAProvider({ children }: IPWAProvider) {
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
  }, [renderer]);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta httpEquiv="cleartype" content="on" />
      </Head>
      {children}
    </>
  );
}
