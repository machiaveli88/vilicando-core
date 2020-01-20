import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import PWAProvider from './PWAProvider';
import Title from './next/Title';

interface IConfigContext {
  name?: string;
}
interface IConfig extends IConfigContext, ILocale, Omit<IFela, 'renderer'> {}
interface IAppProvider extends IConfig, Pick<IFela, 'renderer'> {
  children: React.ReactNode | Array<React.ReactNode>;
  // config?: IConfig;
  isPWA?: boolean;
}

const ConfigContext = React.createContext<IConfigContext>({});

export function useConfig() {
  return React.useContext<IConfigContext>(ConfigContext);
}

export default function AppProvider({
  children,
  // config,
  isPWA,
  locale,
  name,
  theme,
  renderer
}: IAppProvider) {
  // const { name, theme, locale } = config;

  return (
    <ConfigContext.Provider value={{ name }}>
      {!!name && <Title>{name}</Title>}
      <FelaProvider renderer={renderer} theme={theme}>
        <LocaleProvider locale={locale}>
          <Progress>
            {isPWA ? <PWAProvider>{children}</PWAProvider> : children}
          </Progress>
        </LocaleProvider>
      </FelaProvider>
    </ConfigContext.Provider>
  );
}
