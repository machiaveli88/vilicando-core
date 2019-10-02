import * as React from 'react';
import { App, CoreProvider, withApollo } from 'vilicando-core';
import { Layout } from '@components';

class CustomApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    console.log('Port:', process.env.PORT);

    return (
      <CoreProvider apollo={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}

export default withApollo(CustomApp);
