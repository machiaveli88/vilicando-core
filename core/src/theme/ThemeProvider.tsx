import * as React from 'react';
import { RendererContext, ThemeProvider as FelaProvider } from 'react-fela';
import { ITheme } from './types';
import defaultTheme from './theme.json';

interface IThemeProvider {
  theme: Partial<ITheme>;
  overwrite?: boolean;
  children?: React.ReactNode;
}

export default function ThemeProvider({ theme, ...props }: IThemeProvider) {
  const renderer = React.useContext(RendererContext);

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

  return <FelaProvider theme={_theme} {...props} />;
}
