import React from "react";
import { App, AppProvider, Progress } from "vilicando-core";
import { Layout, Navigation } from "@components";
import { ThemeProvider } from "@theme";
import config from "../config.json";

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <ThemeProvider>
          <>
            <Progress />
            <Layout>
              <Component {...pageProps} />
              <Navigation />
            </Layout>
          </>
        </ThemeProvider>
      </AppProvider>
    );
  }
}
