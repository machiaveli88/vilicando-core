import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFela } from './theme';
import PWAProvider from './PWAProvider';
import Head from 'next/head';

interface IConfig {
  name?: string;
  shortName?: string;
  description?: string;
  logo?: string; // path to logo (in public-folder)
  loader?: string; // path to loader-image (in public-folder)
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
  description,
  theme,
  locale,
  renderer,
  ...config
}: IAppProvider) {
  return (
    <ConfigContext.Provider value={{ name, shortName, description, ...config }}>
      <Head>
        {(!!name || !!shortName) && <title>{name || shortName}</title>}
        {!!description && (
          <meta name="description" content={description}></meta>
        )}

        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="Content-Language" content="de" />
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
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
