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
    )
  }
);

function WithLazyLoadingPage() {
  return (
    <>
      <h5>A page with lazy-loading component</h5>
      <Content />
    </>
  );
}

export default WithLazyLoadingPage;
