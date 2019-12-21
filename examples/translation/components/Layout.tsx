import React from 'react';
import { useFela, useLanguage, Link } from 'vilicando-core';

interface ILayout {
  children: React.ReactElement;
}

function Layout({ children }: ILayout) {
  const { css, theme } = useFela();
  const { translate } = useLanguage();

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
        <h2 className={css({ color: theme.white, margin: 0 })}>
          Translation Example App
        </h2>
      </div>

      <div
        className={css({
          width: '75%',
          minWidth: theme.screen.xs,
          maxWidth: theme.screen.md
        })}
      >
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link href="/?lang=de" as="/de">
              <a>{translate('GERMAN')}</a>
            </Link>
          </li>
          <li>
            <Link href="/?lang=en" as="/en">
              <a>{translate('ENGLISH')}</a>
            </Link>
          </li>
        </ul>

        {children}
      </div>
    </div>
  );
}

export default Layout;
