import * as React from 'react';
import { Debe } from 'debe';
import { IRenderer } from 'fela';
export interface ICoreProvider {
    children?: React.ReactNode;
    theme?: object;
    renderer?: IRenderer;
    loader?: () => React.ReactNode;
    loading?: boolean;
    db?: Debe | (() => Debe);
    locale?: string;
}
declare function CoreProvider({ children, theme, renderer, locale }: ICoreProvider): JSX.Element;
export default CoreProvider;
