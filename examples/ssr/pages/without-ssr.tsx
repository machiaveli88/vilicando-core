import * as React from 'react';
import { Loader, dynamic } from 'vilicando-core';
import { Logo } from '@assets';

const Content = dynamic(
  Promise.all([
    import('@components').then(({ Content }) => Content),
    new Promise(resolve => setTimeout(resolve, 600))
  ]).then(([mod]) => mod),
  {
    loading: () => (
      <Loader text="Loading content...">
        <Logo />
      </Loader>
    ),
    ssr: false
  }
);

function WithoutSsrPage() {
  return (
    <>
      <h5>A page without ssr</h5>
      <Content />
    </>
  );
}

export default WithoutSsrPage;
