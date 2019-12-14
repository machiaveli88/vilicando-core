import React from 'react';
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
        minHeight: '100%',
        alignItems: 'center'
      })}
    >
      <div
        className={css({
          backgroundColor: theme.primaryBase,
          padding: theme.spacing.md,
          textAlign: 'center',
          width: '100%'
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>
          Hasura Example App
        </h2>
      </div>

      <div
        className={css({
          width: '75%',
          minWidth: theme.screen.xs,
          maxWidth: theme.screen.md
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
