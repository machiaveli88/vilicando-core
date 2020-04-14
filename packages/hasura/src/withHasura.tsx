import React from "react";
import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import HasuraProvider from "./HasuraProvider";
import getInitialProps from "./getInitialProps";
import initApolloClient from "./apolloClient";

// see https://github.com/zeit/next.js/pull/10451

export interface IWithHasura {
  ssr?: boolean;
}

export default ({ ssr = true }: IWithHasura = {}) => (PageComponent: any) => {
  const WithHasura = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: ApolloClient<any>;
    apolloState: NormalizedCacheObject;
  }) => {
    // getDataFromTree & next.js ssr => apolloClient
    // next.js csr => initApolloClient()
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <HasuraProvider client={client} state={apolloState}>
        <PageComponent {...pageProps} />
      </HasuraProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production")
    WithHasura.displayName = `withHasura(${
      PageComponent.displayName || PageComponent.name || "Component"
    })`;

  // todo: add auth-ssr-support like https://github.com/hasura/graphql-engine/blob/master/community/sample-apps/nextjs-8-serverless/with-apollo-jwt/app/utils/auth.js
  WithHasura.getInitialProps = getInitialProps(
    PageComponent.getInitialProps,
    ssr
  );

  return WithHasura;
};
