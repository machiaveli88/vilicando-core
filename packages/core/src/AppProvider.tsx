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
  isPWA?: boolean;
}
export interface IAppProvider extends IConfig, ILocale, IFela {
  children: React.ReactNode | Array<React.ReactNode>;
  themeProvider?: any; // todo
}

const ConfigContext = React.createContext<IConfig>({});

export function useConfig() {
  return React.useContext<IConfig>(ConfigContext);
}

export default function AppProvider({
  children,
  themeProvider: ThemeProvider = FelaProvider,
  isPWA,
  name,
  shortName,
  description,
  logo,
  theme,
  locale,
  renderer,
  ...config
}: IAppProvider) {
  return (
    <ConfigContext.Provider
      value={{ name, shortName, description, logo, ...config }}
    >
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

        {!!logo && (
          <>
            <link
              rel="icon"
              type="image/png"
              sizes="196x196"
              href="/images/favicon-196.png"
            />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/apple-icon-180.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="167x167"
              href="/images/apple-icon-167.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/images/apple-icon-152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/images/apple-icon-120.png"
            />
          </>
        )}
      </Head>

      <ThemeProvider renderer={renderer} theme={theme}>
        <LocaleProvider locale={locale}>
          <Progress>
            {isPWA ? <PWAProvider>{children}</PWAProvider> : children}
          </Progress>
        </LocaleProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
}
