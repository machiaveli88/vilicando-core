import React from 'react';
import { App, AppProvider, withRouter, TLocale } from 'vilicando-core';
import { Layout } from '@components';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const { lang } = router.query;
    const locale = lang as TLocale;

    return (
      <AppProvider locale={locale} title="Translation Example App">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  }
}

export default withRouter(CustomApp);
