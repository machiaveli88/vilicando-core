import React from "react";
import { App, AppProvider } from "vilicando-core";
import { ThemeProvider } from "@theme";
import config from "../config.json";

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider {...config}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProvider>
    );
  }
}
