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
      <div
        className={css({
          display: 'flex',
          borderBottom: `1px solid ${theme['primary-color']}`
        })}
      >
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-1'],
            padding: theme['padding-md']
          })}
        >
          <h2 className={css({ color: theme['secondary-color'], margin: 0 })}>
            Theme
          </h2>
        </div>
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-2']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-3']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-4']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-5']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-6']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-7']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-8']
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme['primary-9']
          })}
        />
        <div
          className={css({
            width: '10%',
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
          <h1 className={css({ color: theme['secondary-color'] })}>
            Example App
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
