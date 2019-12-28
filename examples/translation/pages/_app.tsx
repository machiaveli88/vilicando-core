import React from 'react';
import { App, CoreProvider, withRouter, ILocales } from 'vilicando-core';
import { Layout } from '@components';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const { lang } = router.query;
    const locale = lang as ILocales;

    return (
      <CoreProvider locale={locale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}

export default withRouter(CustomApp);
