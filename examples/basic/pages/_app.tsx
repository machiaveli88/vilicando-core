import * as React from 'react';
import App from 'next/app';
import renderer from '../renderer';
import theme from '../theme.json';
import { Container } from 'vilicando-core/next';
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
