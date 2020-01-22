import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import PWAProvider from './PWAProvider';
import Head from 'next/head';

interface IConfig {
  name?: string;
  shortName?: string;
  description?: string; // todo: wird benötigt für pwa-generation und für den Header (<meta name="description" content="description is written here">)
  // logo?: string; // todo: Pfad relativ zu /public, wird benötigt für pwa-generation und ist Standart-Grafik im Loader (wenn nichts anderes angegeben)
}
interface IAppProvider extends IConfig, ILocale, IFela {
  children: React.ReactNode | Array<React.ReactNode>;
  isPWA?: boolean;
}

const ConfigContext = React.createContext<IConfig>({});

export function useConfig() {
  return React.useContext<IConfig>(ConfigContext);
}

export default function AppProvider({
  children,
  isPWA,
  name,
  shortName,
  theme,
  locale,
  renderer,
  ...config
}: IAppProvider) {
  return (
    <ConfigContext.Provider value={{ name, shortName, ...config }}>
      <Head>
        {(!!name || !!shortName) && <title>{name || shortName}</title>}

        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="Content-Language" content="de" />
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
          rel="stylesheet"
        />
      </Head>

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
