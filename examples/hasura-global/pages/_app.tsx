import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { HasuraProvider } from 'vilicando-hasura';
import { Layout } from '@components';
import { ThemeProvider } from '@theme';
import config from '../config.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <ThemeProvider>
          <HasuraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HasuraProvider>
        </ThemeProvider>
      </AppProvider>
    );
  }
}

export default CustomApp;
