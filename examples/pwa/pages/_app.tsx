import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider name="PWA Example App" isPWA>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}
