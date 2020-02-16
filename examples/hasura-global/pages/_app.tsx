import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { HasuraProvider } from 'vilicando-hasura';
import { Layout } from '@components';
import config from '../config.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <HasuraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HasuraProvider>
      </AppProvider>
    );
  }
}

export default CustomApp;
