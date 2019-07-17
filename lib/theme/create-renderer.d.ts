import { TPlugin } from 'fela';
export interface ICreateRenderer {
    plugins?: Array<TPlugin>;
    css?: string;
}
declare const _default: ({ plugins, css }: ICreateRenderer) => import("fela").IRenderer;
export default _default;
