import * as React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
// import './progress.less';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export interface IProgress {
  children: React.ReactNode;
}

export default ({ children }: IProgress) => <>{children}</>;
