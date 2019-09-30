import * as React from 'react';
import renderer from '../renderer';
import {
  Body,
  Document,
  DocumentContext,
  Head,
  Html
  } from 'vilicando-core';

export default class CustomDocument extends Document {
  static async getInitialProps(props: DocumentContext) {
    return await Document.getInitialProps({
      renderer,
      ...props
    });
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet"
          />
        </Head>
        <Body />
      </Html>
    );
  }
}
