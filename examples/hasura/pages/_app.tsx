import * as React from 'react';
import { App, CoreProvider } from 'vilicando-core';
import { HasuraProvider } from 'vilicando-hasura';
import { Layout } from '@components';
import schema from '../schema.json';

const headers = {
  'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
};

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CoreProvider>
        <HasuraProvider
          http={{
            uri: process.env.GRAPHQL_HTTP,
            headers
          }}
          ws={{
            uri: process.env.GRAPHQL_WS,
            options: {
              reconnect: true,
              connectionParams: {
                headers
              }
            }
          }}
          schema={schema}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HasuraProvider>
      </CoreProvider>
    );
  }
}

export default CustomApp;
