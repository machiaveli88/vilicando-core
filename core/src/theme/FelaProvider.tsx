import * as React from 'react';
import { ThemeProvider, RendererProvider } from 'react-fela';
import { IRenderer } from 'fela';
import defaultRenderer from './defaultRenderer';
import defaultTheme from './theme.json';
import { ITheme } from './types';

interface IFelaProvider {
  theme: Partial<ITheme>;
  renderer?: IRenderer;
  overwrite?: boolean;
  children?: React.ReactNode;
}

export default function FelaProvider({
  theme,
  renderer = defaultRenderer,
  ...props
}: IFelaProvider) {
  const _theme = React.useMemo(() => {
    const _theme = Object.assign(defaultTheme, theme);

    // default styles
    renderer.renderStatic(
      {
        fontFamily: _theme.fontFamily,
        fontSize: _theme.fontSizeMd,
        color: _theme.black
      },
      'html,body'
    );
    renderer.renderStatic({ color: _theme.headingColor }, 'h1,h2,h3,h4,h5,h6');
    renderer.renderStatic({ fontSize: _theme.heading1Size }, 'h1');
    renderer.renderStatic({ fontSize: _theme.heading2Size }, 'h2');
    renderer.renderStatic({ fontSize: _theme.heading3Size }, 'h3');
    renderer.renderStatic({ fontSize: _theme.heading4Size }, 'h4');
    renderer.renderStatic({ fontSize: _theme.heading5Size }, 'h5');
    renderer.renderStatic({ fontSize: _theme.heading6Size }, 'h6');
    renderer.renderStatic(
      { color: _theme.linkColor, textDecoration: _theme.linkDecoration },
      'a'
    );
    renderer.renderStatic(
      {
        color: _theme.linkHoverColor,
        textDecoration: _theme.linkHoverDecoration
      },
      'a:hover'
    );
    renderer.renderStatic({ color: _theme.linkActiveColor }, 'a:active');

    return _theme;
  }, [theme]);

  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={_theme} {...props} />
    </RendererProvider>
  );
}
