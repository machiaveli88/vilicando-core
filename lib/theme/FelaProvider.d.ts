import * as React from 'react';
import { IRenderer } from 'fela';
export interface IFelaProvider {
    children?: React.ReactNode;
    theme?: object;
    renderer?: IRenderer;
}
declare function FelaProvider({ children, theme, renderer }: IFelaProvider): JSX.Element;
export default FelaProvider;
