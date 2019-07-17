import * as React from 'react';
import { IRenderer } from 'fela';
export interface IFelaProvider {
    children: React.ReactNode;
    renderer: IRenderer;
    theme?: object;
}
declare function FelaProvider({ children, theme, renderer }: IFelaProvider): JSX.Element;
export default FelaProvider;
