import React from 'react';
import { Link } from 'vilicando-core';
import { useLanguage } from '@translation';

export default function Navigation() {
  const { LANGUAGES } = useLanguage();

  return (
    <div>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link href="/?lang=de" as="/de">
            <a>{LANGUAGES.GERMAN}</a>
          </Link>
        </li>
        <li>
          <Link href="/?lang=en" as="/en">
            <a>{LANGUAGES.ENGLISH}</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
