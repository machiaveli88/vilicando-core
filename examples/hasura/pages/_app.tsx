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

const headers = {
  'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
};

export default withApollo({
  http: {
    uri: process.env.GRAPHQL_HTTP,
    headers
  },
  ws: {
    uri: process.env.GRAPHQL_WS,
    options: {
      reconnect: true,
      connectionParams: {
        headers
      }
    }
  }
})(CustomApp);
