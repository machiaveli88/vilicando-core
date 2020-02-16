import React from 'react';
import { App, AppProvider, withRouter, TLocale } from 'vilicando-core';
import { Layout } from '@components';
import config from '../config.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const {
      query: { lang }
    } = router;

    return (
      <AppProvider {...config} locale={lang as TLocale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}

export default withRouter(CustomApp);
