import React from 'react';
import Title from './next/Title';

export interface IConfig {
  title?: string;
}
interface IConfigContext extends IConfig {}
interface IConfigProvider extends IConfig {
  children: React.ReactNode | Array<React.ReactNode>;
}

const ConfigContext = React.createContext<IConfigContext>({});

export function useConfig() {
  return React.useContext<IConfigContext>(ConfigContext);
}

export default function ConfigProvider({
  children,
  ...props
}: IConfigProvider) {
  return (
    <ConfigContext.Provider value={props}>
      {!!props.title && <Title>{props.title}</Title>}
      {children}
    </ConfigContext.Provider>
  );
}
