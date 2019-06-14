import * as React from 'react';
import { Debe } from 'debe';
import { IRenderer } from 'fela';
import './style.less';
export interface ICoreProvider {
    children?: React.ReactNode;
    theme?: object;
    renderer?: IRenderer;
    loader?: () => React.ReactNode;
    db?: Debe | (() => Debe);
}
declare function CoreProvider({ children, db, theme, renderer, loader }: ICoreProvider): JSX.Element;
export default CoreProvider;
