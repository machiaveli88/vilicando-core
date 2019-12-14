import React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { AntdProvider } from 'vilicando-antd';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider>
        <AntdProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AntdProvider>
      </CoreProvider>
    );
  }
}
