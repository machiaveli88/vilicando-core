import React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { Layout } from '@components';
import theme from '../theme.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider theme={theme} title="Theming Example App">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}
