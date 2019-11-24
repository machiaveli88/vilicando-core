import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';

export interface IHasuraProvider<TCacheShape = any> {
  children: React.ReactNode;
  apollo?: ApolloClient<TCacheShape>;
}

function HasuraProvider({ children, apollo }: IHasuraProvider) {
  // todo: Add Splash Screen: https://github.com/zeit/next.js/issues/5736, https://github.com/nguyenbathanh/react-loading-screen/blob/master/public/index.html

  return <ApolloProvider client={apollo}>{children}</ApolloProvider>;
}

export default HasuraProvider;
