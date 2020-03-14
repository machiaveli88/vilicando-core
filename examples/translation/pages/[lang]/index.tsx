import React from 'react';
import { useLanguage } from '@translation';

function StartPage() {
  const { HEADER, TEXT } = useLanguage();

  return (
    <>
      <h1>{HEADER}</h1>
      <p>{TEXT}</p>
    </>
  );
}

export default StartPage;
