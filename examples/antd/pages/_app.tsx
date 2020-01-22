import React from 'react';
import { App } from 'vilicando-core';
import { AppProvider } from 'vilicando-antd';
import config from '../config.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <Component {...pageProps} />
      </AppProvider>
    );
  }
}
