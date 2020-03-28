import React from "react";
import { Link } from "vilicando-core";

export default function Navigation() {
  return (
    <>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link href="/">
            <a>Start</a>
          </Link>
        </li>
        <li>
          <Link href="/with-lazy-loading">
            <a>With lazy-loading</a>
          </Link>
        </li>
        <li>
          <Link href="/without-ssr">
            <a>Without SSR</a>
          </Link>
        </li>
        <li>
          <Link href="/with-custom-ssr">
            <a>With custom SSR</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
