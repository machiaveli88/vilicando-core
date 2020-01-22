import React from 'react';
import { App, AppProvider, withRouter, TLocale } from 'vilicando-core';
import { Layout } from '@components';
import config from '../config.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const { lang } = router.query;
    const locale = lang as TLocale;

    return (
      <AppProvider {...config} locale={locale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}

export default withRouter(CustomApp);
