import React from 'react';
import { Body, Document, Head, Html } from 'vilicando-core';

export default class CustomDocument extends Document {
  render() {
    const name = 'IbeA';
    const color = '#BF1F5C';

    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-title" content={name} />
          <meta name="application-name" content={name} />
          <meta name="msapplication-TileColor" content={color} />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml?v=1"
          />
          <meta name="theme-color" content={color} />

          <link
            rel="apple-touch-startup-image"
            href="/favicon/launch-screen.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color={color}
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico?v=1" />

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Comfortaa:300"
            rel="stylesheet"
          />
        </Head>
        <Body />
      </Html>
    );
  }
}
