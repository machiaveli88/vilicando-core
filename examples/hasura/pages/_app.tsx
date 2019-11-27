import React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { Layout } from '@components';
import { HasuraProvider } from 'vilicando-hasura';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider>
        <HasuraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HasuraProvider>
      </CoreProvider>
    );
  }
}

export default CustomApp;
