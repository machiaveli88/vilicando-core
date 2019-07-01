import * as React from 'react';
import { Debe } from 'debe';
import { IRenderer } from 'fela';
export interface ICoreProvider {
    children?: React.ReactNode;
    theme?: object;
    renderer?: IRenderer;
    loader?: () => React.ReactNode;
    db?: Debe | (() => Debe);
    phrases?: object;
    locale?: string;
}
declare function CoreProvider({ children, db, theme, renderer, loader, phrases, locale }: ICoreProvider): JSX.Element;
export default CoreProvider;
