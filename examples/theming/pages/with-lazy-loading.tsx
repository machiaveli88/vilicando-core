import * as React from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'vilicando-core';
import Logo from '../assets/logo.svg';

const Form = dynamic(() => import('@components/Form'), {
  loading: () => (
    <Loader text="Loading Form...">
      <Logo />
    </Loader>
  )
});

function StartPage() {
  return (
    <div>
      <h2>Antd-Form with lazy-loading</h2>
      <Form />
    </div>
  );
}

export default StartPage;
