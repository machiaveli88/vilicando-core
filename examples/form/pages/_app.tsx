import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { AntdProvider } from 'vilicando-antd';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider name="Form Example App">
        <AntdProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AntdProvider>
      </AppProvider>
    );
  }
}
