import * as React from 'react';
import { useFela } from '../theme';

function ResponsiveHelper() {
  const { css, theme } = useFela();

  return (
    <div
      className={css({
        position: 'fixed',
        left: theme.paddingXl,
        bottom: theme.paddingXl,
        backgroundColor: theme.primaryColor,
        color: theme.white,
        paddingX: theme.paddingMd,
        paddingY: theme.paddingSm,
        borderRadius: theme.paddingXl,
        opacity: 0.75,
        zIndex: 2000,
        onHover: {
          opacity: 0
        }
      })}
    >
      Screen&nbsp;
      <span
        className={css({
          display: 'none',
          ifExtraLarge: { display: 'inline-block' }
        })}
      >
        extra-large
      </span>
      <span
        className={css({
          display: 'none',
          ifHuge: { display: 'inline-block' }
        })}
      >
        huge
      </span>
      <span
        className={css({
          display: 'none',
          ifLarge: { display: 'inline-block' }
        })}
      >
        large
      </span>
      <span
        className={css({
          display: 'none',
          ifMedium: { display: 'inline-block' }
        })}
      >
        medium
      </span>
      <span
        className={css({
          display: 'none',
          ifSmall: { display: 'inline-block' }
        })}
      >
        small
      </span>
      <span
        className={css({
          display: 'none',
          ifMini: { display: 'inline-block' }
        })}
      >
        mini
      </span>
      <span
        className={css({
          display: 'none',
          ifExtraSmall: { display: 'inline-block' }
        })}
      >
        extra-small
      </span>
    </div>
  );
}

export default ResponsiveHelper;
