import React from "react";
import { App, AppProvider } from "vilicando-core";
import { Layout } from "@components";
import { ThemeProvider } from "@theme";
import config from "../config.json";

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppProvider>
    );
  }
}
