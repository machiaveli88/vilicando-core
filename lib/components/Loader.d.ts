export interface IComponentLoader {
    logo?: string;
    size?: number;
}
declare function ComponentLoader({ size, logo }: IComponentLoader): JSX.Element;
declare namespace ComponentLoader {
    var displayName: string;
}
export default ComponentLoader;
