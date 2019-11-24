import * as React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { withApollo, HasuraProvider } from 'vilicando-hasura';
import { Layout } from '@components';
import schema from '../schema.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <CoreProvider>
        <HasuraProvider apollo={apollo}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HasuraProvider>
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
  },
  schema
})(CustomApp);
