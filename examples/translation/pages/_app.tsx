import React from 'react';
import { App, CoreProvider, withRouter } from 'vilicando-core';
import { Layout } from '@components';
import translations from '../translations.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const { lang } = router.query;
    const locale = typeof lang === 'string' ? lang : undefined;

    return (
      <CoreProvider translations={translations} locale={locale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}

export default withRouter(CustomApp);
