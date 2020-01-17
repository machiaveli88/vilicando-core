import React from 'react';
import { Head as NextHead } from 'next/document';

interface IHead {
  children?: React.ReactNode | Array<React.ReactNode>;
}

function Head({ children }: IHead) {
  return (
    <NextHead>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
        rel="stylesheet"
      />

      {children}
    </NextHead>
  );
}

export default Head;
