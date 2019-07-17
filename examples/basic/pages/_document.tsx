import * as React from 'react';
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript
  } from 'next/document';
import renderer from '../renderer';
import { renderToSheetList } from 'fela-dom';

export default class CustomDocument extends Document {
  static async getInitialProps({ renderPage, ...rest }: DocumentContext) {
    const initialProps = await Document.getInitialProps({
      renderPage: () =>
        renderPage({
          enhanceApp: App => props => (
            // @ts-ignore
            <App {...props} renderer={renderer} />
          )
        }),
      ...rest
    });

    return {
      ...initialProps,
      styles: renderToSheetList(renderer).map(
        ({ type, rehydration, support, media, css }: any) => (
          <style
            dangerouslySetInnerHTML={{ __html: css }}
            data-fela-rehydration={rehydration}
            data-fela-support={support}
            data-fela-type={type}
            key={`${type}-${media}`}
            media={media}
          />
        )
      )
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width" />

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
