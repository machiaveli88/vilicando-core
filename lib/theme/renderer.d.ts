import { TPlugin } from 'fela';
interface IRenderer {
    plugins?: Array<TPlugin>;
    css?: string;
}
declare const _default: ({ plugins, css }: IRenderer) => import("fela").IRenderer;
export default _default;
