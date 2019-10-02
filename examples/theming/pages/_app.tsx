import * as React from 'react';
import theme from '../theme.json';
import { App, CoreProvider, Loader } from 'vilicando-core';
import { Layout } from '@components';
import Logo from '../assets/logo.svg';
import translations from '../translations.json';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider
        theme={theme}
        translations={translations}
        showLoader={() => (
          <Loader text="Example app">
            <Logo />
          </Loader>
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}
