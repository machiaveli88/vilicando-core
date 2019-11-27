import React from 'react';
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
    onSSR: () => <div>No SSR for this content supported!</div>
  }
);

function WithCustomSsrPage() {
  return (
    <>
      <h5>A page with custom ssr</h5>
      <Content />
    </>
  );
}

export default WithCustomSsrPage;
