import * as React from 'react';
import { useFela } from 'vilicando-core';
import Link from 'next/link';

interface ILayout {
  children: React.ReactElement;
}

function Layout({ children }: ILayout) {
  const { css, theme } = useFela();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        alignItems: 'center'
      })}
    >
      <div
        className={css({
          backgroundColor: theme.primaryColor,
          padding: theme.spacingMd,
          textAlign: 'center',
          width: '100%'
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>
          SSR Example App
        </h2>
      </div>

      <div
        className={css({
          width: '75%',
          minWidth: theme.screenXs,
          maxWidth: theme.screenMd
        })}
      >
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

        <h3>Content</h3>
        {children}
      </div>
    </div>
  );
}

export default Layout;
