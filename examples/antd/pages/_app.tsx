import React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { AntdProvider } from 'vilicando-antd';
import theme from '../theme.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider>
        <AntdProvider theme={theme}>
          <Component {...pageProps} />
        </AntdProvider>
      </CoreProvider>
    );
  }
}
