import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { Layout } from '@components';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider title="Hasura Example App">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}

export default CustomApp;
