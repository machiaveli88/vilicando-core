import * as React from 'react';
import Link from 'next/link';
import { useFela } from 'vilicando-core';

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
        minHeight: '100%'
      })}
    >
      <div className={css({ display: 'flex' })}>
        <div
          className={css({
            width: '25%',
            height: 20,
            backgroundColor: theme['primary-1']
          })}
        />
        <div
          className={css({
            width: '25%',
            height: 20,
            backgroundColor: theme['primary-4']
          })}
        />
        <div
          className={css({
            width: '25%',
            height: 20,
            backgroundColor: theme['primary-7']
          })}
        />
        <div
          className={css({
            width: '25%',
            height: 20,
            backgroundColor: theme['primary-10']
          })}
        />
      </div>
      <div className={css({ display: 'flex', flexGrow: 1 })}>
        <div
          className={css({
            width: '25%',
            backgroundColor: theme['primary-1'],
            padding: theme['padding-md']
          })}
        >
          <Link href="/">
            <a className={css({ display: 'block' })}>Start</a>
          </Link>
          <Link href="/about">
            <a className={css({ display: 'block' })}>About</a>
          </Link>
        </div>
        <div
          className={css({
            width: '75%',
            padding: theme['padding-md']
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
