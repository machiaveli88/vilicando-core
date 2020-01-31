import React from 'react';
import LocaleProvider, { ILocale } from './LocaleProvider';
import { Progress } from './components';
import { FelaProvider, IFelaProvider } from './theme';
import PWAProvider from './PWAProvider';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

export interface IManifest {
  name?: string;
  short_name?: string;
  icons?: Array<{
    src: string;
    sizes: string;
    type?:
      | 'image/apng'
      | 'image/bmp'
      | 'image/gif'
      | 'image/x-icon'
      | 'image/jpeg'
      | 'image/png'
      | 'image/svg+xml'
      | 'image/tiff'
      | 'image/webp';
  }>;
  start_url?: string;
  background_color?: string; // backgroundColor of splashscreen
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary';
  scope?: string;
  theme_color?: string; // color of toolbar
  description?: string;
  dir?: 'ltr' | 'rtl' | 'auto'; // text-direction of name/short_name
  lang?: string; // language, e.g. "en-US"
  prefer_related_applications?: boolean;
  related_applications?: Array<{
    platform: string;
    url: string;
    id?: string;
  }>;
}

interface IConfig {
  name?: string;
  shortName?: string;
  description?: string;
  logo?: string; // path to logo (in public-folder)
  loader?: string; // path to loader-image (in public-folder)
  isPWA?: boolean;
  manifest?: IManifest;
}
export interface IAppProvider extends IConfig, ILocale, IFelaProvider {
  children: React.ReactNode | Array<React.ReactNode>;
  themeProvider?: (props: IFelaProvider) => JSX.Element;
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
          <CookiesProvider>
            <Progress>
              {isPWA ? <PWAProvider>{children}</PWAProvider> : children}
            </Progress>
          </CookiesProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
}
