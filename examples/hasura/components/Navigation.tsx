import React from 'react';
import { Link } from 'vilicando-core';

export default function Navigation() {
  return (
    <div>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link href="/without-ssr">
            <a>Data only on client visible</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Data also on ssr visible</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
