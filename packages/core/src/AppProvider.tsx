import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import PWAProvider from './PWAProvider';
import Title from './next/Title';

interface IConfigContext {
  title?: string;
}
interface IConfig extends IConfigContext, ILocale, Omit<IFela, 'renderer'> {}
interface IAppProvider extends IConfig, Pick<IFela, 'renderer'> {
  children: React.ReactNode | Array<React.ReactNode>;
  // config: IConfig;
  isPWA?: boolean;
}

const ConfigContext = React.createContext<IConfigContext>({});

export function useConfig() {
  return React.useContext<IConfigContext>(ConfigContext);
}

function AppProvider({
  children,
  // config,
  isPWA,
  title,
  theme,
  renderer,
  locale
}: IAppProvider) {
  return (
    <ConfigContext.Provider value={{ title }}>
      {!!title && <Title>{title}</Title>}
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

export default AppProvider;
