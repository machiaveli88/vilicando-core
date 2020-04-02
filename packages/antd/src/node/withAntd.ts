#!/usr/bin/env node
// @ts-ignore todo: remove
import withLess from "@zeit/next-less";
import { theme as _baseTheme, ITheme } from "vilicando-core";
// @ts-ignore todo: remove
import FilterWarningsPlugin from "webpack-filter-warnings-plugin";
import { merge } from "lodash";

const resolveColor = (o: object, theme: ITheme, color: string) => {
  o[`${color}-color`] = theme[color]?.base;

  for (let i = 1; i <= 10; i++) o[`${color}-${i}`] = theme[color]?.[i];
};

module.exports = (modifyVars: any, nextConfig: any) => {
  if (!nextConfig) {
    if (modifyVars.webpack) {
      nextConfig = { ...modifyVars };
      modifyVars = {};
    } else {
      nextConfig = {};
    }
  }

  const { lessLoaderOptions, webpack, ...rest } = nextConfig;
  const { antd = {}, ...themeVars } = modifyVars;

  const baseTheme = merge({}, _baseTheme, themeVars);
  let theme = {};

  // colors
  [
    "primary",
    "pink",
    "magenta",
    "red",
    "volcano",
    "orange",
    "yellow",
    "gold",
    "cyan",
    "lime",
    "green",
    "blue",
    "geekblue",
    "purple",
  ].forEach(c => resolveColor(theme, baseTheme, c));

  // theme-vars
  theme = {
    ...theme,
    "info-color": baseTheme.blue.base,
    "success-color": baseTheme.green.base,
    "processing-color": baseTheme.blue.base,
    "error-color": baseTheme.red.base,
    "highlight-color": baseTheme.red.base,
    "warning-color": baseTheme.gold.base,
    "normal-color": baseTheme.blue,
    white: baseTheme.white,
    black: baseTheme.black,
    "body-background": baseTheme.app.background,
    "component-background": baseTheme.app.foreground,
    "font-familiy": baseTheme.font.base.fontFamily,
    // "code-family": 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    "text-color": baseTheme.font.base.color,
    "text-color-secondary": baseTheme.font.base.secondary,
    "text-color-inverse": baseTheme.white,
    "icon-color": baseTheme.font.base.color,
    "icon-color-hover": baseTheme.font.base.secondary,
    "heading-color": baseTheme.heading.base.color,
    "heading-color-dark": baseTheme.heading.base.inverse,
    "text-color-dark": baseTheme.font.base.inverse,
    // "text-color-secondary-dark": fade(@white, 65%);
    "text-selection-bg": baseTheme.primary.base,
    "font-size-base": baseTheme.font.base.fontSize,
    "font-size-lg": baseTheme.font.lg.fontSize,
    "font-size-sm": baseTheme.font.sm.fontSize,
    "heading-1-size": baseTheme.heading[1].fontSize,
    "heading-2-size": baseTheme.heading[2].fontSize,
    "heading-3-size": baseTheme.heading[3].fontSize,
    "heading-4-size": baseTheme.heading[4].fontSize,
    "line-height-base": baseTheme.font.base.lineHeight,
    "border-radius-base": baseTheme.border.base.borderRadius,
    "border-radius-sm": baseTheme.border.base.borderRadius,
    "padding-lg": baseTheme.spacing.lg,
    "padding-md": baseTheme.spacing.md,
    "padding-sm": baseTheme.spacing.sm,
    "padding-xs": baseTheme.spacing.xs,
    "padding-xss": baseTheme.spacing.xxs,
    "control-padding-horizontal": baseTheme.spacing.lg,
    "control-padding-horizontal-sm": baseTheme.spacing.md,
    "margin-lg": baseTheme.spacing.lg,
    "margin-md": baseTheme.spacing.md,
    "margin-sm": baseTheme.spacing.sm,
    "margin-xs": baseTheme.spacing.xs,
    "margin-xss": baseTheme.spacing.xxs,
    "height-base": baseTheme.input.base.height,
    "height-lg": baseTheme.input.lg.height,
    "height-sm": baseTheme.input.sm.height,
    // "link-decoration": baseTheme.link.base.textDecoration.toString(),
    // "link-hover-decoration": baseTheme.link.hover.textDecoration.toString(),
    // "link-focus-decoration": baseTheme.link.focus.textDecoration.toString(),
    "ease-out": baseTheme.ease.out,
    "ease-in": baseTheme.ease.in,
    "ease-in-out": baseTheme.ease.inOut,
    "border-color-base": baseTheme.border.base.borderColor,
    "border-color-inverse": baseTheme.white,
    "border-width-base": baseTheme.border.base.borderWidth,
    "border-style-base": baseTheme.border.base.borderStyle,
    "shadow-color": baseTheme.boxShadow.base.color,
    // "shadow-1-up": baseTheme.boxShadow.base.toString(),
    // "shadow-1-down": baseTheme.boxShadow.base.toString(),
    // "shadow-1-left": baseTheme.boxShadow.base.toString(),
    // "shadow-1-right": baseTheme.boxShadow.base.toString(),
    // "shadow-2": baseTheme.boxShadow.base.toString(),
    "btn-font-weight": baseTheme.input.base.font.fontWeight,
    "btn-border-radius-base": baseTheme.input.base.border.borderRadius,
    "btn-border-radius-sm": baseTheme.input.base.border.borderRadius,
    "btn-border-width": baseTheme.input.base.border.borderWidth,
    "btn-border-style": baseTheme.input.base.border.borderStyle,
    // "btn-shadow": baseTheme.boxShadow.base.toString(), // none
    // "btn-primary-shadow": baseTheme.boxShadow.base.toString(), // none
    // "btn-text-shadow": baseTheme.textShadow.base.toString(), // none
    "btn-primary-color": baseTheme.white,
    "btn-default-color": baseTheme.primary.base,
    "btn-default-border": baseTheme.border.base.borderColor,
    "btn-danger-color": baseTheme.white,
    "btn-danger-border": baseTheme.border.base.borderColor,
    "btn-disable-border": baseTheme.border.base.borderColor,
    "btn-padding-horizontal-base": baseTheme.spacing.lg,
    "btn-padding-horizontal-lg": baseTheme.spacing.lg,
    "btn-padding-horizontal-sm": baseTheme.spacing.md,
    "checkbox-size": baseTheme.font.lg.fontSize,
    "checkbox-check-color": baseTheme.white,
    "descriptions-bg": baseTheme.primary[1],
    "descriptions-title-margin-bottom": baseTheme.spacing.md,
    "radio-size": baseTheme.font.lg.fontSize,
    "screen-xs": baseTheme.screen.xs,
    "screen-sm": baseTheme.screen.sm,
    "screen-md": baseTheme.screen.md,
    "screen-lg": baseTheme.screen.lg,
    "screen-xl": baseTheme.screen.xl,
    "screen-xxl": baseTheme.screen.xxl,
    // @grid-columns: 24;
    // @grid-gutter-width: 0;
    // ...to be continued
    "input-border-color": baseTheme.input.base.border.borderColor,
    "layout-header-height": "56px",
    "select-border-color": baseTheme.input.base.border.borderColor,
    ...antd,
  };

  // add "px" to numbers
  Object.keys(theme).forEach(
    key =>
      (theme[key] =
        typeof theme[key] === "number" && !key.includes("line-height")
          ? `${theme[key]}px`
          : theme[key])
  );

  return withLess({
    extractCssChunksOptions: { orderWarning: false },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: theme,
      ...lessLoaderOptions,
    },
    webpack: (config: any, options: any) => {
      const { isServer } = options;

      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context: any, request: any, callback: any) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader",
        });
      }

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        })
      );

      if (typeof webpack === "function") {
        return webpack(config, options);
      }

      return config;
    },
    ...rest,
  });
};
