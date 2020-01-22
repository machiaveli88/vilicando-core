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
        <meta httpEquiv="cleartype" content="on" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2048-2732.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2732-2048.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1668-2388.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2388-1668.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1668-2224.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2224-1668.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1536-2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2048-1536.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1242-2688.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2688-1242.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1125-2436.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2436-1125.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-828-1792.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1792-828.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1242-2208.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-2208-1242.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-750-1334.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1334-750.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-640-1136.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple-splash-1136-640.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
      </Head>
      {children}
    </>
  );
}
