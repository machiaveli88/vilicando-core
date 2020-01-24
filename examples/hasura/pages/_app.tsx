import React from 'react';
import { App, AppProvider } from 'vilicando-core';
import { ApolloProvider } from 'vilicando-hasura';
import { Layout } from '@components';
import config from '../config.json';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <ApolloProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AppProvider>
    );
  }
}

export default CustomApp;
