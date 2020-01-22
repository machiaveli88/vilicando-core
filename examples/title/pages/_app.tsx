import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { Layout } from '@components';
import config from '../config.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}
