import React from 'react';
import Title from './next/Title';

interface IConfigContext {
  title?: string;
  // todo: add loader
}

interface IConfigProvider {
  title?: string;
  children: React.ReactNode | Array<React.ReactNode>;
}

const ConfigContext = React.createContext<IConfigContext>({});

export function useConfig() {
  return React.useContext<IConfigContext>(ConfigContext);
}

export default function ConfigProvider({ title, children }: IConfigProvider) {
  return (
    <ConfigContext.Provider value={{ title }}>
      {!!title && <Title>{title}</Title>}
      {children}
    </ConfigContext.Provider>
  );
}
