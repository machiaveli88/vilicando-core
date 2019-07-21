import * as React from 'react';
import renderer from '../renderer';
import theme from '../theme.json';
import { App, Container, Loader } from 'vilicando-core';
import { Layout } from '@components';
import { Logo } from '@assets';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container
        theme={theme}
        renderer={renderer}
        showLoader={() => (
          <Loader text="Example app">
            <Logo />
          </Loader>
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
