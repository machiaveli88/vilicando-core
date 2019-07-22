import * as React from 'react';
import { Loader, dynamic } from 'vilicando-core';
import { Logo } from '@assets';

const Form = dynamic(() => import('@components/Form'), {
  loading: () => (
    <Loader text="Loading Form...">
      <Logo />
    </Loader>
  ),
  onSSR: () => <div>No SSR for this content supported!</div>
});

function StartPage() {
  return (
    <div>
      <h2>Antd-Form without SSR</h2>
      <Form />
    </div>
  );
}

export default StartPage;
