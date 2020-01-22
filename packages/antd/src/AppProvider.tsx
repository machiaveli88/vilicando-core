import React from 'react';
import { AppProvider, IAppProvider } from 'vilicando-core';
import AntdProvider from './AntdProvider';

export default (props: IAppProvider) => (
  <AppProvider themeProvider={AntdProvider} {...props} />
);
