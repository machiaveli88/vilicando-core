import * as React from 'react';
import { Head as NextHead } from 'next/document';

interface IHead {
  children?: React.ReactNode;
}

function Head({ children }: IHead) {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width" />
      {children}
    </NextHead>
  );
}

export default Head;
