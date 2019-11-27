import React from 'react';
import { useLanguage } from 'vilicando-core';

function StartPage() {
  const { translate } = useLanguage();

  return (
    <>
      <h1>{translate('HEADER')}</h1>
      <p>{translate('TEXT')}</p>
    </>
  );
}

export default StartPage;
