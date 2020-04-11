import React from "react";
import {
  ThemeProvider,
  RendererProvider,
  ThemeProviderProps,
} from "react-fela";
import { IRenderer } from "fela";
import defaultRenderer from "./defaultRenderer";
import { TThemeOut } from "vilicando-core";

export interface IFelaProvider<T> extends Omit<ThemeProviderProps, "theme"> {
  children?: React.ReactNode | Array<React.ReactNode>;
  theme: TThemeOut<T>;
  renderer?: IRenderer;
}

export default function FelaProvider<T>({
  theme,
  renderer = defaultRenderer,
  ...props
}: IFelaProvider<T>) {
  return (
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme} {...props} />
    </RendererProvider>
  );
}
