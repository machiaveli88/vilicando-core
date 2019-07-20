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
          borderBottom: `1px solid ${theme.primaryColor}`
        })}
      >
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary1,
            padding: theme.paddingMd
          })}
        >
          <h2 className={css({ color: theme.secondaryColor, margin: 0 })}>
            Theme
          </h2>
        </div>
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary2
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary3
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary4
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary5
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary6
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary7
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary8
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary9
          })}
        />
        <div
          className={css({
            width: '10%',
            backgroundColor: theme.primary10
          })}
        />
      </div>
      <div className={css({ display: 'flex', flexGrow: 1 })}>
        <div
          className={css({
            width: '25%',
            backgroundColor: theme.primary1,
            padding: theme.paddingMd
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
            padding: theme.paddingMd
          })}
        >
          <h1 className={css({ color: theme.secondaryColor })}>Example App</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
