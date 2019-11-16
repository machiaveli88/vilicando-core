import * as React from 'react';
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
          backgroundColor: theme.primaryColor,
          padding: theme.spacingMd,
          textAlign: 'center',
          width: '100%'
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>
          Theming Example App
        </h2>
      </div>

      <div
        className={css({
          width: '75%',
          minWidth: theme.screenXs,
          maxWidth: theme.screenMd
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
