import React from "react";
import { App, AppProvider, withRouter, resolveLocale } from "vilicando-core";
import { Layout, Navigation } from "@components";
import config from "../config.json";
import { ThemeProvider } from "@theme";

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const {
      query: { lang },
    } = router;

    return (
      <AppProvider {...config} locale={resolveLocale(lang)}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <Navigation />
          </Layout>
        </ThemeProvider>
      </AppProvider>
    );
  }
}

export default withRouter(CustomApp);
