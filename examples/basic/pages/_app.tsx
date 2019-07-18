import * as React from 'react';
import renderer from '../renderer';
import theme from '../theme.json';
import { App, Container } from 'vilicando-core';
import { Layout } from '@components';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container theme={theme} renderer={renderer}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
