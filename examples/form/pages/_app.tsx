import React from 'react';
import { App } from 'vilicando-core';
import { AppProvider } from 'vilicando-antd';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider name="Form Example App">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}
