import * as React from 'react';
import { IRenderer } from 'fela';
export interface IContainer {
    children: React.ReactElement;
    theme?: any;
    renderer?: IRenderer;
}
declare const _default: ({ children, theme, renderer }: IContainer) => JSX.Element;
export default _default;
