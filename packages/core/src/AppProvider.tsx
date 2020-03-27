import React from "react";
import LocaleProvider, { ILocale } from "./LocaleProvider";
import PWAProvider from "./PWAProvider";
import Head from "next/head";

export interface IManifest {
  name?: string;
  short_name?: string;
  icons?: Array<{
    src: string;
    sizes: string;
    type?:
      | "image/apng"
      | "image/bmp"
      | "image/gif"
      | "image/x-icon"
      | "image/jpeg"
      | "image/png"
      | "image/svg+xml"
      | "image/tiff"
      | "image/webp";
  }>;
  start_url?: string;
  background_color?: string; // backgroundColor of splashscreen
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary";
  scope?: string;
  theme_color?: string; // color of toolbar
  description?: string;
  dir?: "ltr" | "rtl" | "auto"; // text-direction of name/short_name
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
  logo_light?: string; // path to logo for dark bg (in public-folder)
  loader?: string; // path to loader-image (in public-folder)
  isPWA?: boolean;
  manifest?: IManifest;
}
export interface IAppProvider extends IConfig, ILocale {
  children: React.ReactNode | Array<React.ReactNode>;
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
  logo,
  locale,
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

        {/* Normalize */}
        <style>{`
          html {
            line-height: 1.15;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
          body {
            margin: 0;
          }
          article,
          aside,
          footer,
          header,
          nav,
          section {
            display: block;
          }
          h1 {
            font-size: 2em;
            margin: 0.67em 0;
          }
          figcaption,
          figure,
          main {
            display: block;
          }
          figure {
            margin: 1em 40px;
          }
          hr {
            box-sizing: content-box;
            height: 0;
            overflow: visible;
          }
          pre {
            font-family: monospace, monospace;
            font-size: 1em;
          }
          a {
            background-color: transparent;
            -webkit-text-decoration-skip: objects;
          }
          abbr[title] {
            border-bottom: none;
            text-decoration: underline;
            text-decoration: underline dotted;
          }
          b,
          strong {
            font-weight: inherit;
          }
          b,
          strong {
            font-weight: bolder;
          }
          code,
          kbd,
          samp {
            font-family: monospace, monospace;
            font-size: 1em;
          }
          dfn {
            font-style: italic;
          }
          mark {
            background-color: #ff0;
            color: #000;
          }
          small {
            font-size: 80%;
          }
          sub,
          sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
          }
          sub {
            bottom: -0.25em;
          }
          sup {
            top: -0.5em;
          }
          audio,
          video {
            display: inline-block;
          }
          audio:not([controls]) {
            display: none;
            height: 0;
          }
          img {
            border-style: none;
          }
          svg:not(:root) {
            overflow: hidden;
          }
          button,
          input,
          optgroup,
          select,
          textarea {
            font-family: sans-serif;
            font-size: 100%;
            line-height: 1.15;
            margin: 0;
          }
          button,
          input {
            overflow: visible;
          }
          button,
          select {
            text-transform: none;
          }
          button,
          html [type='button'],
          [type='reset'],
          [type='submit'] {
            -webkit-appearance: button;
          }
          button::-moz-focus-inner,
          [type='button']::-moz-focus-inner,
          [type='reset']::-moz-focus-inner,
          [type='submit']::-moz-focus-inner {
            border-style: none;
            padding: 0;
          }
          button:-moz-focusring,
          [type='button']:-moz-focusring,
          [type='reset']:-moz-focusring,
          [type='submit']:-moz-focusring {
            outline: 1px dotted ButtonText;
          }
          fieldset {
            padding: 0.35em 0.75em 0.625em;
          }
          legend {
            box-sizing: border-box;
            color: inherit;
            display: table;
            max-width: 100%;
            padding: 0;
            white-space: normal;
          }
          progress {
            display: inline-block;
            vertical-align: baseline;
          }
          textarea {
            overflow: auto;
          }
          [type='checkbox'],
          [type='radio'] {
            box-sizing: border-box;
            padding: 0;
          }
          [type='number']::-webkit-inner-spin-button,
          [type='number']::-webkit-outer-spin-button {
            height: auto;
          }
          [type='search'] {
            -webkit-appearance: textfield;
            outline-offset: -2px;
          }
          [type='search']::-webkit-search-cancel-button,
          [type='search']::-webkit-search-decoration {
            -webkit-appearance: none;
          }
          ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit;
          }
          details,
          menu {
            display: block;
          }
          summary {
            display: list-item;
          }
          canvas {
            display: inline-block;
          }
          template {
            display: none;
          }
          [hidden] {
            display: none;
          }
        `}</style>
      </Head>

      <LocaleProvider locale={locale}>
        {isPWA ? <PWAProvider>{children}</PWAProvider> : children}
      </LocaleProvider>
    </ConfigContext.Provider>
  );
}
