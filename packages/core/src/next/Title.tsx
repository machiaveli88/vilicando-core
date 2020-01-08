import React from 'react';
import Head from 'next/head';

interface ITitle {
  children?: React.ReactNode;
  meta?: React.ReactNode | React.ReactNode[];
}

function Title({ children, meta }: ITitle) {
  return (
    <Head>
      <title>{children}</title>
      {meta}
    </Head>
  );
}

export default Title;
