import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { AntdProvider } from 'vilicando-antd';
import theme from '../theme.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider name="Antd Example App">
        <AntdProvider theme={theme}>
          <Component {...pageProps} />
        </AntdProvider>
      </AppProvider>
    );
  }
}
