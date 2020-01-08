import React from 'react';
import { useFela, useConfig, Link } from 'vilicando-core';

interface ILayout {
  children: React.ReactElement;
}

function Layout({ children }: ILayout) {
  const { css, theme } = useFela();
  const { title } = useConfig();

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
          backgroundColor: theme.primary.base,
          padding: theme.spacing.md,
          textAlign: 'center',
          width: '100%'
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>{title}</h2>
      </div>

      <div
        className={css({
          width: '75%',
          minWidth: theme.screen.xxs,
          maxWidth: theme.screen.md
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
