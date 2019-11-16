import * as React from 'react';
import { Loader, dynamic } from 'vilicando-core';
import { Logo } from '@assets';

const Content = dynamic(
  import('@components').then(({ Content }) => Content),
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
