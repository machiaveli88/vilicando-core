import React from 'react';
import {
  ThemeProvider,
  RendererProvider,
  ThemeProviderProps
} from 'react-fela';
import { IRenderer } from 'fela';
import { merge } from 'lodash';
import defaultRenderer from './defaultRenderer';
import defaultTheme from './theme.json';
import { ITheme } from './types';
import Head from 'next/head';

export interface IFelaProvider<T = {}>
  extends Omit<ThemeProviderProps, 'theme'> {
  children?: React.ReactNode | Array<React.ReactNode>;
  theme?: Partial<T & ITheme>;
  renderer?: IRenderer;
}

export default function FelaProvider({
  theme = {},
  renderer = defaultRenderer,
  ...props
}: IFelaProvider) {
  // merging theme & set default styles
  const _theme = React.useMemo(() => {
    const _theme = merge(defaultTheme, theme);

    renderer.renderStatic(
      {
        fontFamily: _theme.font.family,
        fontSize: _theme.font.size.md,
        color: _theme.black
      },
      'html,body'
    );
    renderer.renderStatic(
      {
        backgroundColor: _theme.background.color.base
      },
      'body'
    );
    renderer.renderStatic(
      {
        backgroundColor: _theme.background.color.light
      },
      '#__next'
    );
    renderer.renderStatic({ color: _theme.heading.color }, 'h1,h2,h3,h4,h5,h6');
    renderer.renderStatic({ fontSize: _theme.heading[1].size }, 'h1');
    renderer.renderStatic({ fontSize: _theme.heading[2].size }, 'h2');
    renderer.renderStatic({ fontSize: _theme.heading[3].size }, 'h3');
    renderer.renderStatic({ fontSize: _theme.heading[4].size }, 'h4');
    renderer.renderStatic({ fontSize: _theme.heading[5].size }, 'h5');
    renderer.renderStatic({ fontSize: _theme.heading[6].size }, 'h6');
    renderer.renderStatic(
      { color: _theme.link.color, textDecoration: _theme.link.decoration },
      'a'
    );
    renderer.renderStatic(
      {
        color: _theme.link.hover.color,
        textDecoration: _theme.link.hover.decoration
      },
      'a:hover'
    );
    renderer.renderStatic(
      {
        color: _theme.link.active.color,
        textDecoration: _theme.link.active.decoration
      },
      'a:active'
    );

    return _theme;
  }, [renderer, theme]);

  const fontFamilies = React.useMemo(() => {
    const stringifiedTheme = JSON.stringify(_theme);
    const families: Array<string> = [];

    if (!!~stringifiedTheme.indexOf('Open Sans')) families.push('Open Sans');
    if (!!~stringifiedTheme.indexOf('Roboto')) families.push('Roboto');

    return families;
  }, [_theme]);

  // only on csr
  React.useEffect(() => {
    const fonts = JSON.parse(sessionStorage.getItem('fonts'));

    if (fonts) {
      // If the font had been loaded before
      // Just active the font immediately
      document.documentElement.classList.add('wf-active');
      Object.keys(fonts).forEach(key =>
        document.documentElement.classList.add(`wf-${fonts[key]}-active`)
      );
    }

    import('webfontloader').then(WebFont => {
      const families = [...fontFamilies];

      if (families.length) {
        families.push('&display=swap');

        WebFont.load({
          google: { families },
          timeout: 3000,
          active: () =>
            document.documentElement.classList.remove(
              'wf-displayswap-n4-inactive'
            ),
          fontactive: (familyName: string, fvd: string) => {
            const fonts = JSON.parse(sessionStorage.getItem('fonts')) || {};
            fonts[familyName] =
              familyName.replace(' ', '').toLowerCase() + '-' + fvd;

            sessionStorage.setItem('fonts', JSON.stringify(fonts));
          }
        });
      }
    });
  }, [fontFamilies]);

  return (
    <RendererProvider renderer={renderer}>
      <>
        <Head>
          {typeof window === 'undefined' &&
            fontFamilies.map((font, i) => (
              <link
                key={i}
                href={`https://fonts.googleapis.com/css?family=${encodeURI(
                  font
                )}`}
                rel="stylesheet"
              />
            ))}
        </Head>
        <ThemeProvider theme={_theme} {...props} />
      </>
    </RendererProvider>
  );
}
