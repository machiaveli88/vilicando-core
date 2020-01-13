import React from 'react';
import { Head as NextHead } from 'next/document';

interface IHead {
  children?: React.ReactNode | Array<React.ReactNode>;
}

function Head({ children }: IHead) {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta http-equiv="cleartype" content="on" />
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {children}
    </NextHead>
  );
}

export default Head;
