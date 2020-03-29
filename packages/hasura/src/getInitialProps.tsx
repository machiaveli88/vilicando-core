import React from "react";
import initContext, { IContext } from "./initContext";
import App, { AppContext } from "next/app";

export default (getInitialProps: any, ssr: boolean) => async (
  ctx: IContext
) => {
  const { AppTree, res } = ctx;
  const inAppContext = Boolean(ctx.ctx);
  const { apolloClient } = initContext(ctx);

  let pageProps = {};
  if (getInitialProps) {
    pageProps = await getInitialProps(ctx);
  } else if (inAppContext) {
    pageProps = await App.getInitialProps(ctx as AppContext);
  }

  // Only on the server:
  if (typeof window === "undefined")
    if (res && res.finished)
      // When redirecting, the response is finished.
      // No point in continuing to render
      return pageProps;
    else if (ssr && AppTree)
      try {
        const { getDataFromTree } = await import("@apollo/react-ssr");

        // Since AppComponents and PageComponents have different context types
        // we need to modify their props a little.
        let props;
        if (inAppContext) {
          props = { pageProps: undefined, ...pageProps, apolloClient };
        } else {
          props = { pageProps: { ...pageProps, apolloClient } };
        }

        // Take the Next.js AppTree, determine which queries are needed to render,
        // and fetch them. This method can be pretty slow since it renders
        // your entire AppTree once for every query. Check out apollo fragments
        // if you want to reduce the number of rerenders.
        // https://www.apollographql.com/docs/react/data/fragments/
        await getDataFromTree(<AppTree {...props} />);
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error("Error while running `getDataFromTree`", error);
      }

  return {
    ...pageProps,
    // Extract query data from the Apollo store
    apolloState: apolloClient.cache.extract(),
    // Provide the client for ssr. As soon as this payload
    // gets JSON.stringified it will remove itself.
    apolloClient: ctx.apolloClient
  };
};
