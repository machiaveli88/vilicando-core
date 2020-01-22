import React from 'react';
import {
  ThemeProvider,
  RendererProvider,
  ThemeProviderProps
} from 'react-fela';
import { IRenderer } from 'fela';
import { merge } from 'lodash';
import Head from 'next/head';
import defaultRenderer from './defaultRenderer';
import defaultTheme from './theme.json';
import { ITheme } from './types';

export interface IFela {
  theme?: Partial<ITheme>;
  renderer?: IRenderer;
}
interface IFelaProvider extends IFela, Omit<ThemeProviderProps, 'theme'> {
  children?: React.ReactNode | Array<React.ReactNode>;
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
    renderer.renderStatic({ color: _theme.link.active.color }, 'a:active');

    return _theme;
  }, [renderer, theme]);

  return (
    <RendererProvider renderer={renderer}>
      <>
        <Head>
          {!!~JSON.stringify(_theme).indexOf('Open Sans') && (
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans"
              rel="stylesheet"
            />
          )}
          {!!~JSON.stringify(_theme).indexOf('Roboto') && (
            <link
              href="https://fonts.googleapis.com/css?family=Roboto"
              rel="stylesheet"
            />
          )}
        </Head>

        <ThemeProvider theme={_theme} {...props} />
      </>
    </RendererProvider>
  );
}
