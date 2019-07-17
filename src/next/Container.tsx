import * as React from 'react';
import CoreProvider from '../CoreProvider';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Container } from 'next/app';
import { IRenderer } from 'fela';

/*
  Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:

  - Persisting layout between page changes
  - Keeping state when navigating pages
  - Custom error handling using componentDidCatch
  - Inject additional data into pages (for example by processing GraphQL queries)
*/

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export interface IContainer {
  children: React.ReactElement;
  theme?: any;
  renderer?: IRenderer;
}

export default ({ children, theme, renderer }: IContainer) => (
  <Container>
    <CoreProvider theme={theme} renderer={renderer}>
      {children}
    </CoreProvider>
  </Container>
);
