import * as React from 'react';
import App, { Container } from 'next/app';
import renderer from '../renderer';
import theme from '../theme.json';
import { CoreProvider } from 'vilicando-core';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <CoreProvider theme={theme} renderer={renderer}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CoreProvider>
      </Container>
    );
  }
}
