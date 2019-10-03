import * as React from 'react';
import { App, CoreProvider, withApollo } from 'vilicando-core';
import { Layout } from '@components';

class CustomApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <CoreProvider apollo={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CoreProvider>
    );
  }
}

export default withApollo({
  uri: process.env.GRAPHQL_URL,
  headers: {
    'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
  }
})(CustomApp);
